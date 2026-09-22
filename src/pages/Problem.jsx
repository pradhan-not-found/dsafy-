import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblemById } from '../data/problems';
import { useApp } from '../context/AppContext';
import { PlayCircle, CheckCircle2 } from 'lucide-react';

export default function Problem() {
  const { problemId } = useParams();
  const { markSolved } = useApp();
  const problem = getProblemById(problemId);
  const [code, setCode] = useState(problem?.starterCode?.javascript || '');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('description'); // description, testcases, result
  const [isRunning, setIsRunning] = useState(false);

  if (!problem) return (
    <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">
      Problem not found. <Link to="/problems" className="ml-2 text-black font-bold">Go back</Link>
    </div>
  );

  const handleRun = () => {
    setIsRunning(true);
    setActiveTab('result');
    setOutput('Running test cases...');
    
    // Simulate slight network delay for realism
    setTimeout(() => {
      try {
        let results = [];
        let allPassed = true;
        
        // Extract function name, basic regex to find 'var funcName = function' or 'function funcName'
        const funcMatch = code.match(/(?:var|let|const)\s+([a-zA-Z0-9_]+)\s*=\s*function|function\s+([a-zA-Z0-9_]+)/);
        const funcName = funcMatch ? (funcMatch[1] || funcMatch[2]) : null;

        if (!funcName) throw new Error("Could not find the function definition.");

        const userFunc = new Function(`
          ${code}
          return ${funcName};
        `)();

        problem.testCases.forEach((tc, idx) => {
          // Parse inputs
          let args = [];
          if (tc.input.includes('=')) {
             // e.g. "nums=[2,7,11,15], target=9"
             const parts = tc.input.split(', ');
             args = parts.map(p => JSON.parse(p.split('=')[1]));
          } else {
             args = [JSON.parse(tc.input)];
          }

          const actual = userFunc(...args);
          const actualStr = JSON.stringify(actual);
          // compare
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
    <div className="flex flex-col h-screen" style={{ background: 'var(--app-canvas)' }}>
      {/* Top Navbar */}
      <nav 
        className="h-12 flex items-center justify-between px-4 shrink-0"
        style={{ background: 'var(--app-canvas)', borderBottom: '1px solid var(--app-hairline)' }}
      >
        <div className="flex items-center gap-4">
          <Link to="/problems" className="label hover:opacity-70 transition-opacity">← Back</Link>
          <div className="h-4 w-px" style={{ background: 'var(--app-hairline)' }} />
          <h1 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-ink)' }}>{problem.lcId}. {problem.title}</h1>
          <span className="label" style={{ padding: '2px 6px', background: 'var(--app-soft)', borderRadius: 4, letterSpacing: 0 }}>
            {problem.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRun} 
            disabled={isRunning} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors"
            style={{ fontSize: '12px', fontWeight: 600, background: 'var(--app-soft)', color: 'var(--app-ink)' }}
          >
            <PlayCircle size={14} /> Run Code
          </button>
          <button 
            onClick={handleRun} 
            disabled={isRunning} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors hover:opacity-90"
            style={{ fontSize: '12px', fontWeight: 600, background: 'var(--app-ink)', color: '#fff' }}
          >
             <CheckCircle2 size={14} /> Submit
          </button>
        </div>
      </nav>

      {/* Split Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane (Description & Output) */}
        <div className="w-1/2 flex flex-col" style={{ borderRight: '1px solid var(--app-hairline)', background: 'var(--app-surface)' }}>
          <div className="flex px-2 pt-2" style={{ borderBottom: '1px solid var(--app-hairline)', background: 'var(--app-canvas)' }}>
            <button 
              className="px-4 py-2 label"
              style={{
                borderBottom: activeTab === 'description' ? '2px solid var(--app-ink)' : '2px solid transparent',
                color: activeTab === 'description' ? 'var(--app-ink)' : 'var(--app-muted)',
                background: activeTab === 'description' ? 'var(--app-surface)' : 'transparent',
                letterSpacing: 0
              }}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className="px-4 py-2 label"
              style={{
                borderBottom: activeTab === 'result' ? '2px solid var(--app-ink)' : '2px solid transparent',
                color: activeTab === 'result' ? 'var(--app-ink)' : 'var(--app-muted)',
                background: activeTab === 'result' ? 'var(--app-surface)' : 'transparent',
                letterSpacing: 0
              }}
              onClick={() => setActiveTab('result')}
            >
              Test Results
            </button>
          </div>

          <div className="flex-1 overflow-auto p-5">
            {activeTab === 'description' && (
              <div className="text-[13px] leading-relaxed" style={{ color: 'var(--app-ink)' }}>
                <div dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br />').replace(/`([^`]+)`/g, '<code style="background:var(--app-soft);padding:2px 4px;border-radius:4px;font-family:monospace;font-size:11px">$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                <h3 style={{ fontWeight: 700, marginTop: 24, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--app-hairline)' }}>Examples</h3>
                {problem.examples.map((ex, i) => (
                  <div key={i} className="mb-4 p-4 rounded-lg" style={{ background: 'var(--app-canvas)', border: '1px solid var(--app-hairline)' }}>
                    <div className="font-mono text-[11px] mb-1"><strong>Input:</strong> {ex.input}</div>
                    <div className="font-mono text-[11px] mb-1"><strong>Output:</strong> {ex.output}</div>
                    {ex.explanation && <div className="text-[12px] mt-2" style={{ color: 'var(--app-muted)' }}>{ex.explanation}</div>}
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'result' && (
              <div className="font-mono text-[12px] whitespace-pre-wrap leading-relaxed p-4 rounded-lg min-h-full" style={{ background: 'var(--app-canvas)', border: '1px solid var(--app-hairline)', color: 'var(--app-ink)' }}>
                {output || 'Run the code to see results here.'}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (Editor) */}
        <div className="w-1/2 flex flex-col" style={{ background: 'var(--app-surface)' }}>
          <div className="h-10 flex items-center px-4" style={{ background: 'var(--app-canvas)', borderBottom: '1px solid var(--app-hairline)' }}>
            <span className="label" style={{ letterSpacing: 0 }}>JavaScript</span>
          </div>
          <div className="flex-1 relative pt-2">
            <Editor
              defaultLanguage="javascript"
              value={code}
              onChange={v => setCode(v)}
              theme="light"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                lineHeight: 22,
                padding: { top: 8 },
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
