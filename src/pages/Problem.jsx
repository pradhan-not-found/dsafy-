import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblemById } from '../data/problems';
import { getTrackById } from '../data/tracks';
import { useApp } from '../context/AppContext';
import DifficultyBadge from '../components/DifficultyBadge';
import StatusIcon from '../components/StatusIcon';
import {
  ArrowLeft, Play, Send, Lightbulb, Code2, BookOpen,
  CheckCircle2, Clock, MemoryStick, ChevronRight, ExternalLink,
  RotateCcw, Terminal
} from 'lucide-react';

const LANG_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C++' },
];

const MONACO_LANG = { javascript: 'javascript', python: 'python', cpp: 'cpp' };

export default function Problem() {
  const { problemId } = useParams();
  const problem = getProblemById(problemId);
  const { solveProblem, markAttempted, getStatus } = useApp();

  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState(() => problem?.starterCode?.javascript || '');
  const [activeTab, setActiveTab] = useState('description');
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [runResult, setRunResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const status = problem ? getStatus(problem.id) : 'unsolved';

  const track = problem ? getTrackById(problem.track) : null;

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setCode(problem?.starterCode?.[newLang] || '');
  };

  const handleRun = useCallback(() => {
    if (!problem) return;
    setRunning(true);
    markAttempted(problem.id);
    setTimeout(() => {
      // Simulate test case running
      const tc = problem.testCases?.[activeTestCase];
      setRunResult({
        type: 'run',
        input: tc?.input || 'N/A',
        expected: tc?.expected || 'N/A',
        output: tc?.expected || 'N/A', // simulate passing
        passed: true,
        runtime: `${Math.floor(Math.random() * 80 + 20)}ms`,
        memory: `${(Math.random() * 20 + 40).toFixed(1)}MB`,
      });
      setRunning(false);
    }, 800);
  }, [problem, activeTestCase, markAttempted]);

  const handleSubmit = useCallback(() => {
    if (!problem) return;
    setRunning(true);
    markAttempted(problem.id);
    setTimeout(() => {
      const passed = code.trim().length > 50; // Basic check: code must not be empty
      setRunResult({
        type: 'submit',
        passed,
        runtime: `${Math.floor(Math.random() * 80 + 20)}ms`,
        memory: `${(Math.random() * 20 + 40).toFixed(1)}MB`,
        testsPassed: passed ? (problem.testCases?.length || 3) : Math.floor(Math.random() * 3),
        testsTotal: problem.testCases?.length || 3,
      });
      if (passed) solveProblem(problem.id, problem.difficulty);
      setRunning(false);
    }, 1200);
  }, [problem, code, solveProblem, markAttempted]);

  const handleReset = () => {
    setCode(problem?.starterCode?.[lang] || '');
    setRunResult(null);
  };

  if (!problem) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem' }}>
      <div style={{ fontSize: '3rem' }}>🔍</div>
      <h2 style={{ color: 'var(--text-secondary)' }}>Problem not found</h2>
      <Link to="/problems" className="btn btn-primary">Browse Problems</Link>
    </div>
  );

  return (
    <div className="editor-layout" style={{ marginLeft: 0 }}>
      {/* Problem Panel */}
      <div className="problem-panel">
        <div className="problem-panel-header">
          <div style={{ flex: 1, minWidth: 0 }}>
            <Link to={`/tracks/${problem.track}`} className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', marginBottom: 8, padding: '4px 8px' }}>
              <ArrowLeft size={12} /> {track?.title}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
                {problem.lcId}. {problem.title}
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 6, flexWrap: 'wrap' }}>
              <DifficultyBadge difficulty={problem.difficulty} />
              <StatusIcon problemId={problem.id} />
              {status === 'solved' && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--diff-easy)', fontWeight: 600 }}>Solved!</span>}
              <a
                href={`https://leetcode.com/problems/${problem.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
                style={{ marginLeft: 'auto', fontSize: 'var(--text-xs)', padding: '3px 8px' }}
              >
                LeetCode <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        <div className="problem-panel-tabs">
          {['description', 'hints', 'solution'].map(tab => (
            <button
              key={tab}
              className={`panel-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              id={`tab-${tab}`}
            >
              {tab === 'description' ? '📝 Problem' : tab === 'hints' ? '💡 Hints' : '✅ Solution'}
            </button>
          ))}
        </div>

        <div className="problem-panel-body">
          {activeTab === 'description' && (
            <div>
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: '1rem' }}>
                {problem.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              {/* Description */}
              <div style={{
                fontSize: 'var(--text-sm)',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
              }}>
                {problem.description.split('\n').map((line, i) => {
                  if (line.startsWith('```')) return null;
                  if (line.startsWith('**')) return (
                    <p key={i} style={{ fontWeight: 700, marginTop: '1rem', marginBottom: '0.25rem' }}>
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                  if (line.startsWith('`') && line.endsWith('`')) return (
                    <code key={i} style={{ background: 'var(--bg-input)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
                      {line.slice(1, -1)}
                    </code>
                  );
                  return line.trim() ? <p key={i} style={{ marginBottom: '0.5rem' }}>{line}</p> : <br key={i} />;
                })}
              </div>

              {/* Examples */}
              {problem.examples?.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Examples</h3>
                  {problem.examples.map((ex, i) => (
                    <div key={i} style={{
                      background: 'var(--bg-input)', borderRadius: 'var(--radius-md)',
                      padding: '0.875rem', marginBottom: '0.75rem',
                      fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                      border: '1px solid var(--border-subtle)',
                    }}>
                      <div><span style={{ color: 'var(--text-muted)' }}>Input: </span><span style={{ color: 'var(--accent-cyan)' }}>{ex.input}</span></div>
                      <div><span style={{ color: 'var(--text-muted)' }}>Output: </span><span style={{ color: 'var(--diff-easy)' }}>{ex.output}</span></div>
                      {ex.explanation && <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>// {ex.explanation}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Complexity */}
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)', flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 4 }}>Time</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--accent-cyan)' }}>{problem.timeComplexity}</div>
                </div>
                <div style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)', flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 4 }}>Space</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--accent-violet)' }}>{problem.spaceComplexity}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hints' && (
            <div>
              <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Reveal hints one at a time to avoid spoilers.
              </div>
              {problem.hints?.map((hint, i) => (
                <details key={i} style={{ marginBottom: '0.75rem' }}>
                  <summary style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-input)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                    border: '1px solid var(--border-subtle)',
                    listStyle: 'none',
                  }}>
                    💡 Hint {i + 1}
                  </summary>
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(99,102,241,0.06)',
                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    borderLeft: '3px solid var(--brand-primary)',
                    marginTop: 4,
                  }}>
                    {hint}
                  </div>
                </details>
              ))}
              {(!problem.hints || problem.hints.length === 0) && (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No hints available.</div>
              )}
            </div>
          )}

          {activeTab === 'solution' && (
            <div>
              {!showSolution ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: 'var(--text-sm)' }}>
                    Try solving the problem first! The solution is here when you need it.
                  </p>
                  <button className="btn btn-secondary" onClick={() => setShowSolution(true)} id="reveal-solution">
                    Reveal Solution
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{
                    background: 'var(--bg-editor)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent-cyan)',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    {problem.solution}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ flex: 1, textAlign: 'center', background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Time</div>
                      <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{problem.timeComplexity}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', background: 'var(--bg-input)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Space</div>
                      <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-violet)' }}>{problem.spaceComplexity}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Editor Panel */}
      <div className="editor-panel">
        <div className="editor-toolbar">
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {LANG_OPTIONS.map(l => (
              <button
                key={l.value}
                id={`lang-${l.value}`}
                className={`panel-tab ${lang === l.value ? 'active' : ''}`}
                onClick={() => handleLangChange(l.value)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="editor-actions">
            <button className="btn btn-ghost btn-sm" onClick={handleReset} id="reset-code" title="Reset code">
              <RotateCcw size={13} /> Reset
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleRun}
              disabled={running}
              id="run-code"
            >
              <Play size={13} /> {running ? 'Running…' : 'Run'}
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={handleSubmit}
              disabled={running}
              id="submit-code"
            >
              <Send size={13} /> {running ? 'Checking…' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="editor-wrapper">
          <Editor
            height="100%"
            language={MONACO_LANG[lang]}
            value={code}
            onChange={val => setCode(val || '')}
            theme="vs-dark"
            options={{
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: 'gutter',
              tabSize: 2,
              wordWrap: 'on',
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              parameterHints: { enabled: true },
            }}
          />
        </div>

        {/* Test Cases / Output */}
        <div className="test-cases-panel">
          <div className="test-cases-header">
            <Terminal size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {runResult ? (runResult.type === 'submit' ? 'Submission Result' : 'Run Output') : 'Test Cases'}
            </span>
            {problem.testCases?.map((_, i) => (
              <button
                key={i}
                className={`test-case-tab ${activeTestCase === i ? 'active' : ''}`}
                onClick={() => setActiveTestCase(i)}
                id={`test-case-${i + 1}`}
              >
                Case {i + 1}
              </button>
            ))}
          </div>

          <div className="test-cases-body">
            {!runResult ? (
              <div>
                {problem.testCases?.[activeTestCase] ? (
                  <>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ color: 'var(--text-muted)' }}>Input: </span>
                      <span style={{ color: 'var(--accent-cyan)' }}>{problem.testCases[activeTestCase].input}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Expected: </span>
                      <span style={{ color: 'var(--diff-easy)' }}>{problem.testCases[activeTestCase].expected}</span>
                    </div>
                  </>
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>Click Run to execute your code against test cases.</span>
                )}
              </div>
            ) : runResult.type === 'run' ? (
              <div>
                <div className={runResult.passed ? 'result-pass' : 'result-fail'} style={{ fontWeight: 700, marginBottom: 8 }}>
                  {runResult.passed ? '✓ Accepted' : '✗ Wrong Answer'}
                </div>
                <div><span style={{ color: 'var(--text-muted)' }}>Input: </span>{runResult.input}</div>
                <div><span style={{ color: 'var(--text-muted)' }}>Output: </span><span className={runResult.passed ? 'result-pass' : 'result-fail'}>{runResult.output}</span></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Expected: </span>{runResult.expected}</div>
                <div style={{ marginTop: 8, color: 'var(--text-muted)' }}>
                  Runtime: {runResult.runtime} · Memory: {runResult.memory}
                </div>
              </div>
            ) : (
              <div>
                <div className={runResult.passed ? 'result-pass' : 'result-fail'} style={{ fontWeight: 700, marginBottom: 8, fontSize: 'var(--text-base)' }}>
                  {runResult.passed ? '✓ Accepted!' : '✗ Wrong Answer'}
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  Tests passed: <span style={{ color: runResult.passed ? 'var(--diff-easy)' : 'var(--diff-hard)', fontWeight: 700 }}>
                    {runResult.testsPassed}/{runResult.testsTotal}
                  </span>
                </div>
                <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>
                  Runtime: {runResult.runtime} · Memory: {runResult.memory}
                </div>
                {runResult.passed && (
                  <div style={{ marginTop: 8, color: 'var(--diff-easy)', fontWeight: 600 }}>
                    🎉 Problem marked as solved! XP awarded.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
