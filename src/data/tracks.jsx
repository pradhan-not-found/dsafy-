import React from 'react';
import {
  List, MoveHorizontal, Maximize, Layers, Search, Link2,
  Network, Share2, Zap, RotateCcw, Database, TextSearch,
  AlignEndHorizontal, Binary
} from 'lucide-react';

export const TRACKS = [
  {
    id: 'arrays-hashing',
    title: 'Arrays & Hashing',
    description: 'The foundation of data structures. Learn to manipulate arrays and use hash maps for O(1) lookups.',
    icon: <List size={24} />,
    color: '#3b82f6',
    colorDim: 'rgba(59, 130, 246, 0.1)',
    difficulty: 'Beginner',
    estimatedHours: 10,
    tags: ['Array', 'Hash Table', 'Sorting'],
    totalProblems: 0,
    modules: [
      { id: 'arr-basics', title: 'Array Basics & Memory', description: 'Understanding contiguous memory, static vs dynamic arrays.', problems: ['contains-duplicate', 'valid-anagram'] },
      { id: 'arr-hashing', title: 'Hash Maps & Sets', description: 'Using hashing for fast lookups and frequency counting.', problems: ['two-sum', 'group-anagrams'] },
      { id: 'arr-advanced', title: 'Advanced Array Techniques', description: 'Prefix sums, sorting, and in-place manipulations.', problems: ['top-k-frequent-elements', 'product-of-array-except-self', 'longest-consecutive-sequence'] },
    ]
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    description: 'Optimize O(N^2) problems to O(N) by traversing collections from two ends or at different speeds.',
    icon: <MoveHorizontal size={24} />,
    color: '#10b981',
    colorDim: 'rgba(16, 185, 129, 0.1)',
    difficulty: 'Beginner-Intermediate',
    estimatedHours: 8,
    tags: ['Two Pointers', 'Array', 'String'],
    totalProblems: 0,
    modules: [
      { id: 'tp-basics', title: 'Opposite Ends', description: 'Moving pointers from start and end towards the middle.', problems: ['valid-palindrome', 'two-sum-ii'] },
      { id: 'tp-water', title: 'Container & Trapping', description: 'Optimizing area and trapped volume calculations.', problems: ['3sum', 'container-with-most-water'] },
      { id: 'tp-fastslow', title: 'Fast & Slow', description: 'Floyd\'s cycle finding algorithm and variations.', problems: ['trapping-rain-water'] },
    ]
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    description: 'Find optimal subarrays or substrings by maintaining a window of valid elements.',
    icon: <Maximize size={24} />,
    color: '#8b5cf6',
    colorDim: 'rgba(139, 92, 246, 0.1)',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    tags: ['Sliding Window', 'String', 'Array'],
    totalProblems: 0,
    modules: [
      { id: 'sw-fixed', title: 'Fixed Window', description: 'Windows of a constant size.', problems: ['best-time-to-buy-and-sell-stock'] },
      { id: 'sw-dynamic', title: 'Dynamic Window', description: 'Expanding and shrinking windows based on conditions.', problems: ['longest-substring-without-repeating-characters', 'longest-repeating-character-replacement'] },
      { id: 'sw-hard', title: 'Advanced Windows', description: 'Multiple conditions and string permutations.', problems: ['permutation-in-string', 'minimum-window-substring', 'sliding-window-maximum'] },
    ]
  },
  {
    id: 'stack-queue',
    title: 'Stacks & Queues',
    description: 'Master LIFO and FIFO structures for parsing, matching, and monotonic sequences.',
    icon: <Layers size={24} />,
    color: '#ec4899',
    colorDim: 'rgba(236, 72, 153, 0.1)',
    difficulty: 'Beginner-Intermediate',
    estimatedHours: 10,
    tags: ['Stack', 'Queue', 'Monotonic'],
    totalProblems: 0,
    modules: [
      { id: 'sq-basics', title: 'Stack Basics', description: 'LIFO operations and parentheses matching.', problems: ['valid-parentheses', 'min-stack'] },
      { id: 'sq-eval', title: 'Expression Evaluation', description: 'Evaluating postfix and infix notations.', problems: ['evaluate-reverse-polish-notation', 'generate-parentheses'] },
      { id: 'sq-mono', title: 'Monotonic Stacks', description: 'Maintaining sorted order for next-greater-element problems.', problems: ['daily-temperatures', 'car-fleet', 'largest-rectangle-in-histogram'] },
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Achieve O(log N) time by eliminating half the search space at each step.',
    icon: <Search size={24} />,
    color: '#f59e0b',
    colorDim: 'rgba(245, 158, 11, 0.1)',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    tags: ['Binary Search', 'Array'],
    totalProblems: 0,
    modules: [
      { id: 'bs-basics', title: 'Standard Binary Search', description: 'Searching in perfectly sorted arrays.', problems: ['binary-search', 'search-a-2d-matrix'] },
      { id: 'bs-rotated', title: 'Rotated Arrays', description: 'Searching when the sorted array is shifted.', problems: ['find-minimum-in-rotated-sorted-array', 'search-in-rotated-sorted-array'] },
      { id: 'bs-answer', title: 'Binary Search on Answer', description: 'Guessing the answer and verifying it.', problems: ['koko-eating-bananas', 'time-based-key-value-store', 'median-of-two-sorted-arrays'] },
    ]
  },
  {
    id: 'linked-list',
    title: 'Linked Lists',
    description: 'Pointer manipulation, reversal techniques, and cycle detection.',
    icon: <Link2 size={24} />,
    color: '#06b6d4',
    colorDim: 'rgba(6, 182, 212, 0.1)',
    difficulty: 'Beginner-Intermediate',
    estimatedHours: 12,
    tags: ['Linked List', 'Two Pointers'],
    totalProblems: 0,
    modules: [
      { id: 'll-basics', title: 'Reversal & Traversal', description: 'Reversing lists and basic pointer arithmetic.', problems: ['reverse-linked-list', 'merge-two-sorted-lists', 'reorder-list'] },
      { id: 'll-removal', title: 'Node Removal', description: 'Removing nodes with dummy pointers.', problems: ['remove-nth-node-from-end-of-list', 'copy-list-with-random-pointer'] },
      { id: 'll-advanced', title: 'Cycles & Merging', description: 'Detecting cycles and merging multiple lists.', problems: ['add-two-numbers', 'linked-list-cycle', 'find-the-duplicate-number', 'lru-cache', 'merge-k-sorted-lists', 'reverse-nodes-in-k-group'] },
    ]
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Traversals (DFS/BFS), recursion, and Binary Search Tree properties.',
    icon: <Network size={24} />,
    color: '#22c55e',
    colorDim: 'rgba(34, 197, 94, 0.1)',
    difficulty: 'Intermediate',
    estimatedHours: 15,
    tags: ['Tree', 'Binary Tree', 'DFS', 'BFS'],
    totalProblems: 0,
    modules: [
      { id: 'tree-traversal', title: 'Tree Traversals & Depth', description: 'Inorder, preorder, postorder, and max depth calculations.', problems: ['invert-binary-tree', 'maximum-depth-of-binary-tree', 'diameter-of-binary-tree', 'balanced-binary-tree'] },
      { id: 'tree-compare', title: 'Comparing & Modifying', description: 'Checking equivalence and transforming trees.', problems: ['same-tree', 'subtree-of-another-tree'] },
      { id: 'tree-bst', title: 'Binary Search Trees', description: 'Leveraging the BST property for fast lookups.', problems: ['lowest-common-ancestor-of-a-binary-search-tree', 'kth-smallest-element-in-a-bst', 'validate-binary-search-tree'] },
      { id: 'tree-advanced', title: 'Advanced Tree Algorithms', description: 'Level order traversals, construction, and path sums.', problems: ['binary-tree-level-order-traversal', 'binary-tree-right-side-view', 'count-good-nodes-in-binary-tree', 'construct-binary-tree-from-preorder-and-inorder-traversal', 'binary-tree-maximum-path-sum', 'serialize-and-deserialize-binary-tree'] },
    ]
  },
  {
    id: 'tries',
    title: 'Tries',
    description: 'Prefix trees for ultra-fast string matching and autocomplete features.',
    icon: <TextSearch size={24} />,
    color: '#f43f5e',
    colorDim: 'rgba(244, 63, 94, 0.1)',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    tags: ['Trie', 'String', 'Design'],
    totalProblems: 0,
    modules: [
      { id: 'trie-basics', title: 'Implementation', description: 'Building a basic prefix tree from scratch.', problems: ['implement-trie-prefix-tree', 'design-add-and-search-words-data-structure'] },
      { id: 'trie-advanced', title: 'Advanced Applications', description: 'Using tries for complex board searches.', problems: ['word-search-ii'] },
    ]
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    description: 'Explore all possibilities and prune invalid paths using recursion.',
    icon: <RotateCcw size={24} />,
    color: '#a855f7',
    colorDim: 'rgba(168, 85, 247, 0.1)',
    difficulty: 'Intermediate-Advanced',
    estimatedHours: 12,
    tags: ['Backtracking', 'Recursion', 'DFS'],
    totalProblems: 0,
    modules: [
      { id: 'bt-combos', title: 'Combinations & Subsets', description: 'Generating all subsets and valid combinations.', problems: ['subsets', 'combination-sum', 'permutations', 'subsets-ii', 'combination-sum-ii'] },
      { id: 'bt-search', title: 'Grid Searching', description: 'Finding paths in 2D matrices.', problems: ['word-search', 'palindrome-partitioning'] },
      { id: 'bt-hard', title: 'Advanced Backtracking', description: 'Complex constraints and board games.', problems: ['letter-combinations-of-a-phone-number', 'n-queens'] },
    ]
  },
  {
    id: 'heaps',
    title: 'Heaps & Priority Queues',
    description: 'Efficiently track the Kth largest/smallest elements in a dynamic dataset.',
    icon: <Database size={24} />,
    color: '#eab308',
    colorDim: 'rgba(234, 179, 8, 0.1)',
    difficulty: 'Intermediate',
    estimatedHours: 8,
    tags: ['Heap', 'Priority Queue'],
    totalProblems: 0,
    modules: [
      { id: 'heap-basics', title: 'Top K Problems', description: 'Finding the largest or smallest K elements.', problems: ['kth-largest-element-in-a-stream', 'last-stone-weight', 'k-closest-points-to-origin'] },
      { id: 'heap-advanced', title: 'Advanced Heaps', description: 'Two heaps, interval merging with heaps.', problems: ['kth-largest-element-in-an-array', 'task-scheduler', 'design-twitter', 'find-median-from-data-stream'] },
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Model real-world relationships. Master BFS, DFS, and topological sort.',
    icon: <Share2 size={24} />,
    color: '#0ea5e9',
    colorDim: 'rgba(14, 165, 233, 0.1)',
    difficulty: 'Intermediate-Advanced',
    estimatedHours: 15,
    tags: ['Graph', 'BFS', 'DFS', 'Union Find'],
    totalProblems: 0,
    modules: [
      { id: 'graph-grid', title: 'Grid Matrix Graphs', description: 'Treating 2D matrices as graphs (Islands).', problems: ['number-of-islands', 'max-area-of-island', 'clone-graph', 'walls-and-gates', 'rotting-oranges', 'pacific-atlantic-water-flow', 'surrounded-regions'] },
      { id: 'graph-topo', title: 'Topological Sort', description: 'Resolving dependency orders.', problems: ['course-schedule', 'course-schedule-ii'] },
      { id: 'graph-uf', title: 'Union Find', description: 'Disjoint set data structure for connectivity.', problems: ['redundant-connection', 'number-of-connected-components-in-an-undirected-graph', 'graph-valid-tree'] },
      { id: 'graph-hard', title: 'Advanced Graphs', description: 'Shortest paths, Dijkstra\'s, and Word Ladders.', problems: ['word-ladder'] },
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Trade space for time by caching subproblem results (Memoization & Tabulation).',
    icon: <Zap size={24} />,
    color: '#ef4444',
    colorDim: 'rgba(239, 68, 68, 0.1)',
    difficulty: 'Advanced',
    estimatedHours: 20,
    tags: ['DP', 'Memoization', 'Math'],
    totalProblems: 0,
    modules: [
      { id: 'dp-1d', title: '1D Dynamic Programming', description: 'State transitions on a single variable.', problems: ['climbing-stairs', 'min-cost-climbing-stairs', 'house-robber', 'house-robber-ii', 'longest-palindromic-substring', 'palindromic-substrings', 'decode-ways', 'coin-change', 'maximum-product-subarray', 'word-break', 'longest-increasing-subsequence', 'partition-equal-subset-sum'] },
      { id: 'dp-2d', title: '2D Dynamic Programming', description: 'Grids and multi-variable state transitions.', problems: ['unique-paths', 'longest-common-subsequence', 'best-time-to-buy-and-sell-stock-with-cooldown', 'coin-change-ii', 'target-sum', 'interleaving-string', 'edit-distance', 'burst-balloons', 'regular-expression-matching'] },
    ]
  },
  {
    id: 'intervals',
    title: 'Intervals',
    description: 'Merge, insert, and query overlapping time intervals.',
    icon: <AlignEndHorizontal size={24} />,
    color: '#14b8a6',
    colorDim: 'rgba(20, 184, 166, 0.1)',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    tags: ['Intervals', 'Sorting'],
    totalProblems: 0,
    modules: [
      { id: 'int-basics', title: 'Overlaps & Merging', description: 'Detecting and resolving overlapping intervals.', problems: ['insert-interval', 'merge-intervals', 'non-overlapping-intervals'] },
      { id: 'int-sweep', title: 'Sweep Line Algorithms', description: 'Meeting rooms and time series events.', problems: ['meeting-rooms', 'meeting-rooms-ii', 'minimum-interval-to-include-each-query'] },
    ]
  },
  {
    id: 'math-bits',
    title: 'Math & Bit Manipulation',
    description: 'Low-level bitwise operations and foundational mathematical algorithms.',
    icon: <Binary size={24} />,
    color: '#64748b',
    colorDim: 'rgba(100, 116, 139, 0.1)',
    difficulty: 'Beginner-Intermediate',
    estimatedHours: 8,
    tags: ['Math', 'Bit Manipulation'],
    totalProblems: 0,
    modules: [
      { id: 'bit-basics', title: 'Bitwise Operators', description: 'XOR, AND, shifts, and masks.', problems: ['single-number', 'number-of-1-bits', 'counting-bits', 'reverse-bits', 'missing-number', 'sum-of-two-integers'] },
      { id: 'math-basics', title: 'Math Fundamentals', description: 'Geometry, rotation, and digit manipulation.', problems: ['reverse-integer', 'plus-one', 'powx-n', 'multiply-strings', 'detect-squares', 'happy-number', 'set-matrix-zeroes', 'spiral-matrix', 'rotate-image'] },
    ]
  }
];

// Initialize total problems count
TRACKS.forEach(t => {
  t.totalProblems = t.modules.reduce((sum, m) => sum + m.problems.length, 0);
});

export function getTrackById(id) {
  return TRACKS.find(t => t.id === id);
}

export function getTotalProblems() {
  return TRACKS.reduce((sum, t) => sum + t.totalProblems, 0);
}
