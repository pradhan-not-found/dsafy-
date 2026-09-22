import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblemById } from '../data/problems';
import { useApp } from '../context/AppContext';
import { PlayCircle, CheckCircle2, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Problem() {
  const { problemId } = useParams();
  const { markSolved } = useApp();
  const problem = getProblemById(problemId);
  const [code, setCode] = useState(problem?.starterCode?.javascript || '');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [isRunning, setIsRunning] = useState(false);

  if (!problem) return (
    <div className="flex h-screen items-center justify-center text-sm text-[var(--app-muted)]">
      Problem not found. <Link to="/problems" className="ml-2 text-[var(--app-ink)] font-semibold hover:underline">Go back</Link>
    </div>
  );

  const handleRun = () => {
    setIsRunning(true);
    setActiveTab('result');
    setOutput('Running test cases...');
    
    setTimeout(() => {
      try {
        let results = [];
        let allPassed = true;
        
        const funcMatch = code.match(/(?:var|let|const)\s+([a-zA-Z0-9_]+)\s*=\s*function|function\s+([a-zA-Z0-9_]+)/);
        const funcName = funcMatch ? (funcMatch[1] || funcMatch[2]) : null;

        if (!funcName) throw new Error("Could not find the function definition.");

        const userFunc = new Function(`
          ${code}
          return ${funcName};
        `)();

        problem.testCases.forEach((tc, idx) => {
          let args = [];
          if (tc.input.includes('=')) {
             const parts = tc.input.split(', ');
             args = parts.map(p => JSON.parse(p.split('=')[1]));
          } else {
             args = [JSON.parse(tc.input)];
          }

          const actual = userFunc(...args);
          const actualStr = JSON.stringify(actual);
          const passed = actualStr === tc.expected || actualStr === tc.expected.replace(/\s/g, '');
          
          if (!passed) allPassed = false;
          results.push(`Test Case ${idx + 1}: ${passed ? '✅ Passed' : '❌ Failed'}\n  Input: ${tc.input}\n  Expected: ${tc.expected}\n  Output: ${actualStr}`);
        });

        if (allPassed) {
          results.push('\n🎉 All test cases passed!');
          markSolved(problem.id, problem.difficulty);
        } else {
          results.push('\n💡 Some test cases failed. Keep trying!');
        }
        setOutput(results.join('\n\n'));
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--app-canvas)] text-[var(--app-ink)]">
      {/* Top Navbar */}
      <nav className="h-14 flex items-center justify-between px-6 shrink-0 border-b border-[var(--app-hairline)] bg-[var(--app-surface)]">
        <div className="flex items-center gap-4">
          <Link to="/problems" className="flex items-center gap-1.5 text-xs font-semibold text-[var(--app-muted)] hover:text-[var(--app-ink)] transition-colors">
            <ChevronLeft size={16} />
            Back
          </Link>
          <div className="h-4 w-px bg-[var(--app-hairline)]" />
          <h1 className="text-sm font-semibold">{problem.lcId}. {problem.title}</h1>
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[var(--app-soft)] text-[var(--app-muted)]">
            {problem.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRun} 
            disabled={isRunning} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--app-soft)] text-[var(--app-ink)] hover:bg-[var(--app-hairline)] transition-colors"
          >
            <PlayCircle size={14} /> Run Code
          </button>
          <button 
            onClick={handleRun} 
            disabled={isRunning} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--app-ink)] text-white hover:opacity-90 transition-opacity"
          >
             <CheckCircle2 size={14} /> Submit
          </button>
        </div>
      </nav>

      {/* Split Pane */}
      <div className="flex-1 flex min-h-0">
        {/* Left Pane (Description & Output) */}
        <div className="w-1/2 flex flex-col border-r border-[var(--app-hairline)] bg-[var(--app-surface)]">
          <div className="flex px-4 pt-2 border-b border-[var(--app-hairline)] bg-[var(--app-canvas)]">
            <button 
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'description' ? 'border-[var(--app-ink)] text-[var(--app-ink)]' : 'border-transparent text-[var(--app-muted)] hover:text-[var(--app-ink)]'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'strategy' ? 'border-[var(--app-ink)] text-[var(--app-ink)]' : 'border-transparent text-[var(--app-muted)] hover:text-[var(--app-ink)]'}`}
              onClick={() => setActiveTab('strategy')}
            >
              Study Strategy
            </button>
            <button 
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'result' ? 'border-[var(--app-ink)] text-[var(--app-ink)]' : 'border-transparent text-[var(--app-muted)] hover:text-[var(--app-ink)]'}`}
              onClick={() => setActiveTab('result')}
            >
              Test Results
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
            {activeTab === 'description' && (
              <div className="text-sm leading-relaxed space-y-4">
                <div className="prose prose-sm max-w-none text-[var(--app-ink)] prose-p:leading-relaxed prose-pre:bg-[var(--app-soft)] prose-pre:text-[var(--app-ink)] prose-th:text-left prose-table:w-auto prose-td:px-4 prose-th:px-4 prose-tr:border-b prose-tr:border-[var(--app-hairline)]">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {problem.description}
                  </ReactMarkdown>
                </div>
                
                <div className="pt-6 mt-6 border-t border-[var(--app-hairline)]">
                  <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-[var(--app-muted)]">Examples</h3>
                  <div className="space-y-4">
                    {problem.examples.map((ex, i) => (
                      <div key={i} className="p-4 rounded-lg bg-[var(--app-canvas)] border border-[var(--app-hairline)] space-y-2">
                        <div className="font-mono text-xs"><strong className="font-semibold font-sans">Input:</strong> {ex.input}</div>
                        <div className="font-mono text-xs"><strong className="font-semibold font-sans">Output:</strong> {ex.output}</div>
                        {ex.explanation && <div className="text-xs text-[var(--app-muted)] mt-2 pt-2 border-t border-[var(--app-hairline)]">{ex.explanation}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'strategy' && (
              <div className="text-sm leading-relaxed space-y-6">
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)] mb-3">What You Need To Study</h3>
                  <ul className="list-disc pl-5 space-y-2 text-[var(--app-ink)]">
                    <li><strong>Core Concept:</strong> Focus on understanding how the optimal approach reduces time complexity from O(N²) to O(N) or O(log N).</li>
                    <li><strong>Pattern Recognition:</strong> Identify if this problem fits standard templates like Two Pointers, Sliding Window, or Fast/Slow pointers.</li>
                    <li><strong>Edge Cases:</strong> Always consider empty inputs, negative numbers, or constraints bounds before writing code.</li>
                  </ul>
                </div>
                <div className="pt-5 border-t border-[var(--app-hairline)]">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--app-muted)] mb-3">What You Don't Need To Worry About</h3>
                  <ul className="list-disc pl-5 space-y-2 text-[var(--app-ink)]">
                    <li className="text-[var(--app-muted)]">Memorizing the exact syntax of obscure standard library methods.</li>
                    <li className="text-[var(--app-muted)]">Over-optimizing space complexity if it compromises code readability during a primary interview round.</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'result' && (
              <div className="font-mono text-xs whitespace-pre-wrap leading-relaxed p-4 rounded-lg min-h-full bg-[var(--app-canvas)] border border-[var(--app-hairline)]">
                {output || 'Run the code to see results here.'}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (Editor) */}
        <div className="w-1/2 flex flex-col bg-[var(--app-surface)]">
          <div className="h-10 flex items-center px-4 border-b border-[var(--app-hairline)] bg-[var(--app-canvas)]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--app-muted)]">JavaScript</span>
          </div>
          <div className="flex-1 relative pt-2">
            <Editor
              defaultLanguage="javascript"
              value={code}
              onChange={v => setCode(v)}
              theme="light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                lineHeight: 24,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                renderLineHighlight: "none",
                hideCursorInOverviewRuler: true,
                scrollbar: {
                  verticalScrollbarSize: 4,
                  horizontalScrollbarSize: 4,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
