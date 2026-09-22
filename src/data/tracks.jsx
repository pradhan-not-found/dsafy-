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
      { 
        id: 'arr-basics', 
        title: 'Array Basics & Memory', 
        description: 'Understanding contiguous memory, static vs dynamic arrays.',
        tutorial: "### What is an Array?\nAn array is a data structure consisting of a collection of elements, each identified by an array index or key. Arrays are stored in contiguous memory locations, which means they sit right next to each other in the RAM.\n\n### Time Complexity\n- **Access:** O(1) - because we can calculate the exact memory address.\n- **Search:** O(N) - we might have to check every element.\n- **Insertion/Deletion:** O(N) - we have to shift all subsequent elements over.\n\n### Static vs Dynamic\nStatic arrays have a fixed size allocated upfront. Dynamic arrays (like JavaScript arrays or Python lists) automatically resize themselves when they get full, usually by doubling their capacity.",
        problems: ['contains-duplicate', 'valid-anagram'] 
      },
      { 
        id: 'arr-hashing', 
        title: 'Hash Maps & Sets', 
        description: 'Using hashing for fast lookups and frequency counting.',
        tutorial: "### The Power of Hash Maps\nA Hash Map (or Hash Table) is a data structure that maps keys to values for highly efficient lookup. It uses a \"hash function\" to compute an index into an array of buckets or slots, from which the desired value can be found.\n\n### Why use them?\nWhen you need to count the frequency of items, or quickly check if an item exists, Hash Maps (and Hash Sets) reduce O(N) search times down to O(1) average time.\n\n### Common Patterns\n1. **Frequency Counting:** Iterate through an array and store `map[element] = map[element] + 1`.\n2. **Complement Search:** When looking for a pair that sums to X, as you iterate, check if `X - current_element` exists in your hash map.",
        problems: ['two-sum', 'group-anagrams'] 
      },
      { 
        id: 'arr-advanced', 
        title: 'Advanced Array Techniques', 
        description: 'Prefix sums, sorting, and in-place manipulations.',
        tutorial: "### Prefix Sums\nA prefix sum array is an array where each element at index `i` is the sum of all elements from the start up to `i`. This is extremely useful for answering range-sum queries in O(1) time after an O(N) preprocessing step.\n\n### In-Place Operations\nMany array problems ask you to modify the array \"in-place\" (with O(1) extra space). This often involves using two pointers or swapping elements directly within the array to avoid creating a new one.",
        problems: ['top-k-frequent-elements', 'product-of-array-except-self', 'longest-consecutive-sequence'] 
      },
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
      { 
        id: 'tp-basics', 
        title: 'Opposite Ends', 
        description: 'Moving pointers from start and end towards the middle.',
        tutorial: "### The Opposite Ends Pattern\nWhen an array is sorted, you can place one pointer at the beginning (`left = 0`) and one at the end (`right = array.length - 1`).\n\n- If the sum of the elements at the two pointers is too large, you decrement `right` to get a smaller sum.\n- If the sum is too small, you increment `left` to get a larger sum.\n\nThis pattern turns an O(N^2) brute force search into an elegant O(N) sweep.",
        problems: ['valid-palindrome', 'two-sum-ii'] 
      },
      { 
        id: 'tp-water', 
        title: 'Container & Trapping', 
        description: 'Optimizing area and trapped volume calculations.',
        tutorial: "### Area Calculations\nIn problems like \"Container With Most Water\", the area is constrained by the shorter line. You place pointers at both ends. To maximize the area, you calculate the current area, and then move the pointer that points to the shorter line inward, hoping to find a taller line to compensate for the reduced width.",
        problems: ['3sum', 'container-with-most-water'] 
      },
      { 
        id: 'tp-fastslow', 
        title: 'Fast & Slow', 
        description: 'Floyd\'s cycle finding algorithm and variations.',
        tutorial: "### Fast and Slow Pointers (Tortoise and Hare)\nThis technique uses two pointers moving at different speeds. \n\n- **Cycle Detection:** If a linked list has a cycle, the fast pointer (moving 2 steps) will eventually lap the slow pointer (moving 1 step) and they will meet.\n- **Finding the Middle:** If you want to find the middle of a linked list in one pass, when the fast pointer reaches the end, the slow pointer will be exactly at the middle.",
        problems: ['trapping-rain-water'] 
      },
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
      { 
        id: 'sw-fixed', 
        title: 'Fixed Window', 
        description: 'Windows of a constant size.',
        tutorial: "### Fixed Size Sliding Window\nInstead of recalculating the sum of a subarray from scratch (which takes O(N) per subarray), we can reuse the sum of the previous subarray.\n\nWhen the window slides to the right, we simply subtract the element that falls out of the window on the left, and add the new element that enters the window on the right. This reduces the time complexity from O(N*K) to O(N).",
        problems: ['best-time-to-buy-and-sell-stock'] 
      },
      { 
        id: 'sw-dynamic', 
        title: 'Dynamic Window', 
        description: 'Expanding and shrinking windows based on conditions.',
        tutorial: "### Dynamic Sliding Window\nIn these problems, the window size changes. We usually have a `left` and `right` pointer.\n\n1. Expand the window by moving `right` and adding elements until the window becomes invalid (e.g. contains duplicate characters).\n2. Once invalid, shrink the window by moving `left` and removing elements until the window becomes valid again.\n3. Keep track of the maximum or minimum window size found during this process.",
        problems: ['longest-substring-without-repeating-characters', 'longest-repeating-character-replacement'] 
      },
      { 
        id: 'sw-hard', 
        title: 'Advanced Windows', 
        description: 'Multiple conditions and string permutations.',
        tutorial: "### Advanced Window Techniques\nSometimes we need to track frequencies of characters inside our window using a Hash Map. For example, when finding the minimum window that contains all characters of another string, we expand until we have all required characters, then shrink from the left to find the tightest possible valid window.",
        problems: ['permutation-in-string', 'minimum-window-substring', 'sliding-window-maximum'] 
      },
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
      { 
        id: 'tree-traversal', 
        title: 'Tree Traversals & Depth', 
        description: 'Inorder, preorder, postorder, and max depth calculations.',
        tutorial: "### Depth First Search (DFS)\nTrees are usually traversed using recursion. There are three main ways to visit nodes in DFS:\n\n1. **Pre-order (Node, Left, Right):** Visit the current node, then recurse left, then recurse right.\n2. **In-order (Left, Node, Right):** Recurse left, visit the current node, then recurse right. (This visits BST nodes in sorted order).\n3. **Post-order (Left, Right, Node):** Recurse left, recurse right, then visit the current node. Useful when you need information from children before processing the parent (like calculating max depth).",
        problems: ['invert-binary-tree', 'maximum-depth-of-binary-tree', 'diameter-of-binary-tree', 'balanced-binary-tree'] 
      },
      { 
        id: 'tree-bst', 
        title: 'Binary Search Trees', 
        description: 'Leveraging the BST property for fast lookups.',
        tutorial: "### The BST Property\nIn a Binary Search Tree, for every node:\n- All nodes in its left subtree are strictly less than the node.\n- All nodes in its right subtree are strictly greater than the node.\n\nThis property allows us to search, insert, and delete in O(log N) average time, making it incredibly powerful for sorted data retrieval.",
        problems: ['lowest-common-ancestor-of-a-binary-search-tree', 'kth-smallest-element-in-a-bst', 'validate-binary-search-tree'] 
      },
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
      { 
        id: 'dp-1d', 
        title: '1D Dynamic Programming', 
        description: 'State transitions on a single variable.',
        tutorial: "### What is DP?\nDynamic Programming is just optimized recursion. When a recursive algorithm calculates the same subproblems repeatedly, we can cache those results (Memoization) or build the answers from the bottom up (Tabulation) to save time.\n\n### 1D DP Example: Climbing Stairs\nTo reach step `n`, you can either come from step `n-1` or step `n-2`. So, `Ways(n) = Ways(n-1) + Ways(n-2)`. Instead of recursively branching out and recalculating, we just store `Ways(i)` in an array as we go up.",
        problems: ['climbing-stairs', 'min-cost-climbing-stairs', 'house-robber', 'house-robber-ii', 'longest-palindromic-substring', 'palindromic-substrings', 'decode-ways', 'coin-change', 'maximum-product-subarray', 'word-break', 'longest-increasing-subsequence', 'partition-equal-subset-sum'] 
      }
    ]
  }
];

// Provide fallback tutorial for any modules that don't have one explicitly defined above
TRACKS.forEach(t => {
  t.modules.forEach(m => {
    if (!m.tutorial) {
      m.tutorial = `### Understanding ${m.title}\n\nThis module covers fundamental concepts related to ${m.title.toLowerCase()}. In computer science, mastering these patterns allows you to optimize algorithms significantly.\n\n### Key Takeaways\n- Always consider edge cases before writing code.\n- Think about the Time (Big O) and Space complexities.\n- Review the problems in this module carefully. Try to solve them on paper before using the code editor.`;
    }
  });
});

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
