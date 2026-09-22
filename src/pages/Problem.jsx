import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblemById } from '../data/problems';
import { useApp } from '../context/AppContext';

export default function Problem() {
  const { problemId } = useParams();
  const { markSolved, getStatus } = useApp();
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
    <div className="flex flex-col h-screen bg-white">
      {/* Top Navbar */}
      <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/problems" className="text-sm font-bold text-gray-500 hover:text-black">← Back</Link>
          <div className="h-4 w-px bg-gray-200" />
          <h1 className="text-sm font-bold">{problem.lcId}. {problem.title}</h1>
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
            {problem.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleRun} disabled={isRunning} className="btn bg-gray-100 hover:bg-gray-200 text-black border-transparent text-xs h-8 px-4 rounded font-bold">
            Run Code
          </button>
          <button onClick={handleRun} disabled={isRunning} className="btn bg-black text-white hover:bg-gray-800 text-xs h-8 px-4 rounded font-bold">
            Submit
          </button>
        </div>
      </nav>

      {/* Split Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane (Description & Output) */}
        <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
          <div className="flex border-b border-gray-200 bg-gray-50 px-2 pt-2">
            <button 
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 ${activeTab === 'description' ? 'border-black text-black bg-white' : 'border-transparent text-gray-500 hover:text-black'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 ${activeTab === 'result' ? 'border-black text-black bg-white' : 'border-transparent text-gray-500 hover:text-black'}`}
              onClick={() => setActiveTab('result')}
            >
              Test Results
            </button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-gray-800">
                <div dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br />').replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded font-mono text-xs">$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                <h3 className="font-bold mt-8 mb-4 border-b border-gray-100 pb-2">Examples</h3>
                {problem.examples.map((ex, i) => (
                  <div key={i} className="mb-4 bg-gray-50 p-4 rounded border border-gray-100">
                    <div className="font-mono text-xs mb-1"><strong>Input:</strong> {ex.input}</div>
                    <div className="font-mono text-xs mb-1"><strong>Output:</strong> {ex.output}</div>
                    {ex.explanation && <div className="text-xs text-gray-500 mt-2">{ex.explanation}</div>}
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'result' && (
              <div className="font-mono text-xs whitespace-pre-wrap text-gray-800 leading-relaxed bg-gray-50 p-4 border border-gray-200 rounded min-h-full">
                {output || 'Run the code to see results here.'}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (Editor) */}
        <div className="w-1/2 flex flex-col bg-[#fffffe]">
          <div className="h-10 border-b border-gray-200 bg-gray-50 flex items-center px-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">JavaScript</span>
          </div>
          <div className="flex-1 relative">
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
