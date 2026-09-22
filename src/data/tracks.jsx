import React from 'react';
import {
  List, MoveHorizontal, Maximize, Network, Zap,
  Database, Search, Layers, Binary, Link2
} from 'lucide-react';

export const TRACKS = [
  {
    id: 'arrays-hashing',
    title: 'Arrays & Hashing',
    description: 'The foundation of data structures. Master contiguous memory, hash maps, and O(1) lookups to solve problems that would otherwise take O(N²).',
    icon: <List size={24} />,
    color: '#3b82f6',
    colorDim: 'rgba(59, 130, 246, 0.1)',
    difficulty: 'Beginner',
    estimatedHours: 10,
    tags: ['Array', 'Hash Table', 'Sorting'],
    totalProblems: 0,
    modules: [
      {
        id: 'intro-arrays',
        title: 'Array Basics & Memory',
        description: 'Contiguous memory, address calculation, static vs dynamic arrays.',
        tutorial: `### What is an Array?
An array is a collection of elements of the **same data type** stored in **contiguous memory locations** — meaning they sit right next to each other in RAM.

### Address Calculation (Exam Essential)
The CPU can directly compute the address of any element using a formula:

**1-D Array:**
> Address(A[i]) = Base Address + i × Size of element

**Example:** If \`int A[10]\` starts at base address \`1000\` and \`int\` occupies 4 bytes:
\`\`\`
Address(A[3]) = 1000 + 3 × 4 = 1012
\`\`\`

**2-D Array (Row-Major Order):**
> Address(A[i][j]) = Base + (i × N + j) × Size

**Example:** \`int A[3][4]\` (3 rows, 4 cols), base = 2000, size = 4 bytes, find A[2][1]:
\`\`\`
Address = 2000 + (2 × 4 + 1) × 4 = 2000 + 36 = 2036
\`\`\`

### Time Complexity — Why each operation costs what it does
| Operation | Complexity | Reason |
|---|---|---|
| Access (read/write) | **O(1)** | Address can be calculated instantly |
| Search (unsorted) | **O(N)** | Must check each element one by one |
| Insertion / Deletion | **O(N)** | All subsequent elements must be shifted |

### Static vs Dynamic Arrays
- **Static:** Fixed size at compile time. You cannot add a 6th element to a size-5 array.
- **Dynamic:** (JavaScript \`Array\`, Python \`list\`) Automatically doubles capacity when full — costly O(N) resizing, but only happens infrequently, giving **amortized O(1)** insertion.

### Applications
- **Sparse Matrix:** A matrix where most elements are zero. Instead of allocating the full M×N matrix, store only non-zero elements as \`(row, col, value)\` triples — saving significant memory.
- **Polynomial Representation:** \`4x³ + 2x + 7\` stored as \`[4, 0, 2, 7]\` for degrees \`3, 2, 1, 0\`.`,
        problems: ['contains-duplicate', 'valid-anagram']
      },
      {
        id: 'hashmaps',
        title: 'Hash Maps & Sets',
        description: 'Using hashing for O(1) lookups, frequency counting, and the complement search pattern.',
        tutorial: `### The Power of Hash Maps
A Hash Map (Hash Table) maps keys to values and achieves **O(1) average time** for insertion, deletion, and lookup — the biggest time-complexity win available to a programmer.

### How It Works Under the Hood
1. Your key goes through a **Hash Function** (e.g., \`key % table_size\`).
2. That function returns an integer index into a hidden underlying array.
3. The value is stored at that index.
4. If two keys produce the same index — a **Collision** — the table uses chaining (linked list at each slot) or open addressing (find the next empty slot).

### Common Hash Functions
| Method | Formula | Example |
|---|---|---|
| Division | \`h(key) = key % table_size\` | 23 % 10 → index 3 |
| Mid-Square | Square the key, take middle digits | 44² = 1936 → index "93" |
| Folding | Split key, sum the parts | 123456 → 123+456 = 579 |

### The Two Core Interview Patterns

**1. Frequency Counting (The Histogram Pattern)**
Count how often each element appears.
\`\`\`javascript
const count = new Map();
for (let num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
}
\`\`\`
*Use cases: Valid Anagram, Majority Element, Top K Frequent.*

**2. The Complement Search**
When looking for a pair that sums to X, check if the complement exists as you iterate.
\`\`\`javascript
const seen = new Map();
for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
}
\`\`\`
*Use case: Two Sum — reduces O(N²) brute force to O(N).*

### The Space-Time Tradeoff
Hash maps are the canonical example: you spend **O(N) extra space** to save **O(N²) time**. This tradeoff is fundamental — almost every interview optimization involves it.

### Load Factor
\`α = number of entries / table size\`
A high load factor increases collision frequency. Standard practice is to rehash (rebuild the table at double size) when α exceeds ~0.7.`,
        problems: ['two-sum', 'group-anagrams']
      },
      {
        id: 'prefix-sums',
        title: 'Advanced Array Techniques',
        description: 'Prefix sums for O(1) range queries, bucket sort, and in-place operations.',
        tutorial: `### Prefix Sums
Build an array where each element is the cumulative sum up to that index. This lets you answer range-sum queries in **O(1)** after **O(N)** preprocessing.

**Algorithm:**
\`\`\`javascript
const prefix = new Array(nums.length).fill(0);
prefix[0] = nums[0];
for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i];
}
// Sum between index L and R = prefix[R] - prefix[L-1]
\`\`\`

**Example:** \`nums = [3, 1, 4, 1, 5]\`, prefix = \`[3, 4, 8, 9, 14]\`. Sum from index 1 to 3 = prefix[3] − prefix[0] = 9 − 3 = 6.

### Bucket Sort (O(N) when applicable)
When values fall within a known bounded range (e.g., frequencies can't exceed the array's length), use buckets indexed by value or frequency to achieve linear-time sorting.

\`\`\`javascript
// Top K Frequent Elements via bucket sort
const buckets = Array.from({ length: nums.length + 1 }, () => []);
for (const [num, count] of freq) buckets[count].push(num);
const res = [];
for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    res.push(...buckets[i]);
}
\`\`\`

### Longest Consecutive Sequence — The HashSet Trick
Put all numbers in a \`Set\`. Then for each number, only start counting if \`num - 1\` is NOT in the set (i.e., it's the beginning of a sequence). This avoids redundant work and gives **O(N)**.

\`\`\`javascript
const set = new Set(nums);
let longest = 0;
for (const n of set) {
    if (!set.has(n - 1)) { // Only start here
        let len = 1;
        while (set.has(n + len)) len++;
        longest = Math.max(longest, len);
    }
}
\`\`\``,
        problems: ['top-k-frequent-elements', 'product-except-self', 'longest-consecutive-sequence']
      },
    ]
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    description: 'Optimize O(N²) problems to O(N) using the opposite-ends and fast/slow pointer techniques on sorted arrays.',
    icon: <MoveHorizontal size={24} />,
    color: '#10b981',
    colorDim: 'rgba(16, 185, 129, 0.1)',
    difficulty: 'Beginner-Intermediate',
    estimatedHours: 8,
    tags: ['Two Pointers', 'Array', 'String'],
    totalProblems: 0,
    modules: [
      {
        id: 'basic-two-pointers',
        title: 'Opposite Ends Pattern',
        description: 'Start pointers at both ends of a sorted array and move them inward to find pairs.',
        tutorial: `### The Opposite Ends Pattern
When an array is **sorted**, placing one pointer at the start and one at the end lets you efficiently search for pairs — converting O(N²) brute force into O(N).

### Core Algorithm
\`\`\`javascript
let left = 0, right = nums.length - 1;
while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum > target) right--; // Too big — shrink from the right
    if (sum < target) left++;  // Too small — grow from the left
}
\`\`\`

### Why This Works
Since the array is sorted:
- Moving \`right\` left **decreases** the sum.
- Moving \`left\` right **increases** the sum.
Every iteration eliminates at least one element from consideration — O(N) total.

### 3Sum — Reducing to 2Sum
Fix one element with an outer loop (\`i\`), then run Two Pointers on the rest.
\`\`\`javascript
nums.sort((a, b) => a - b);
for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue; // Skip duplicates
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];
        if (sum === 0) {
            res.push([nums[i], nums[left], nums[right]]);
            while (left < right && nums[left] === nums[left+1]) left++;
            while (left < right && nums[right] === nums[right-1]) right--;
            left++; right--;
        } else if (sum < 0) left++;
        else right--;
    }
}
\`\`\`

### Valid Palindrome — In-Place Check
\`\`\`javascript
let l = 0, r = s.length - 1;
while (l < r) {
    while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++; // Skip non-alnum
    while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
}
return true;
\`\`\``,
        problems: ['valid-palindrome', 'three-sum']
      },
      {
        id: 'advanced-two-pointers',
        title: 'Container & Trapping Water',
        description: 'Greedy two-pointer approach for area and trapped-water problems.',
        tutorial: `### Container With Most Water — Greedy Two Pointers
You want to maximize \`Area = (right - left) × min(height[left], height[right])\`.

**The Greedy Strategy:** Start with maximum width (pointers at opposite ends). The bottleneck is the shorter line. Move the pointer at the **shorter** line inward — this is the only action that could possibly increase the area.

\`\`\`javascript
let l = 0, r = height.length - 1, max = 0;
while (l < r) {
    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++; // Move the shorter side
    else r--;
}
return max;
\`\`\`

### Trapping Rain Water — The Hard Version
Water trapped at index \`i\` = \`min(maxLeft, maxRight) - height[i]\`.

Track \`maxLeft\` and \`maxRight\` dynamically with two pointers:
- If \`height[l] <= height[r]\`, the water at \`l\` is determined by \`maxLeft\`. Process \`l\` and move it right.
- Otherwise, the water at \`r\` is determined by \`maxRight\`. Process \`r\` and move it left.

\`\`\`javascript
let l = 0, r = height.length - 1;
let maxL = 0, maxR = 0, water = 0;
while (l < r) {
    if (height[l] <= height[r]) {
        maxL = Math.max(maxL, height[l]);
        water += maxL - height[l]; // Water above current bar
        l++;
    } else {
        maxR = Math.max(maxR, height[r]);
        water += maxR - height[r];
        r--;
    }
}
return water;
\`\`\`

**Example trace** on \`[0,1,0,2,1,0,1,3,2,1,2,1]\` → Answer: **6 units** of water.`,
        problems: ['container-with-most-water', 'trapping-rain-water']
      }
    ]
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    description: 'Find optimal subarrays or substrings by maintaining a window of valid elements — reducing O(N*K) to O(N).',
    icon: <Maximize size={24} />,
    color: '#8b5cf6',
    colorDim: 'rgba(139, 92, 246, 0.1)',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    tags: ['Sliding Window', 'String', 'Array'],
    totalProblems: 0,
    modules: [
      {
        id: 'fixed-window',
        title: 'Fixed Window',
        description: 'Reuse previous computations by sliding a constant-size window.',
        tutorial: `### The Fixed Window Insight
For a window of size K, instead of recomputing the sum of all K elements from scratch (O(K) per window → O(N*K) total), you **reuse** the previous window's sum by:
1. **Adding** the new element entering from the right.
2. **Subtracting** the element that just fell off the left.

This reduces total work to **O(N)**.

### Template
\`\`\`javascript
// Step 1: Build the first window
let windowSum = 0;
for (let i = 0; i < k; i++) windowSum += nums[i];
let maxSum = windowSum;

// Step 2: Slide the window
for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // Add new, remove old
    maxSum = Math.max(maxSum, windowSum);
}
return maxSum;
\`\`\`

### Best Time to Buy & Sell Stock
This is conceptually a sliding window / kadane's variant:
- Track the minimum price seen so far (\`minPrice\`).
- At each day, compute profit = \`price - minPrice\`, update the max profit.

\`\`\`javascript
let minPrice = Infinity, maxProfit = 0;
for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    maxProfit = Math.max(maxProfit, p - minPrice);
}
return maxProfit;
\`\`\`
**Example:** \`[7,1,5,3,6,4]\` → Buy at 1, sell at 6 → profit = **5**.`,
        problems: ['best-time-to-buy-and-sell-stock']
      },
      {
        id: 'variable-window',
        title: 'Dynamic (Variable) Window',
        description: 'Expand and shrink the window based on a validity condition.',
        tutorial: `### Dynamic Window — Expand & Shrink
The window size is not fixed. We have \`left\` and \`right\` pointers:
1. **Expand:** Move \`right\` forward, adding the new element to the window state.
2. **Validate:** Check if the current window violates the problem's constraint.
3. **Shrink:** If invalid, advance \`left\` and remove its element from state — until valid.
4. **Record:** Update max/min window size.

### Longest Substring Without Repeating Characters
\`\`\`javascript
let left = 0, maxLen = 0;
const seen = new Set();
for (let right = 0; right < s.length; right++) {
    // Shrink until duplicate is gone
    while (seen.has(s[right])) {
        seen.delete(s[left]);
        left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
}
return maxLen;
\`\`\`
**Example:** \`"abcabcbb"\` → longest = \`"abc"\` → **3**.

### Minimum Window Substring (Hard)
Maintain two frequency maps — one for the target string \`t\`, one for the current window. Track \`formed\` (chars matched at required frequency).
- Expand until all chars are covered (\`formed === required\`).
- Shrink to find the tightest valid window.
- Update the answer whenever shrinking while still valid.

\`\`\`javascript
const need = new Map(); // Frequency of chars needed
for (const c of t) need.set(c, (need.get(c) || 0) + 1);
const have = new Map();
let formed = 0, required = need.size;
let [l, res] = [0, [-1, 0, 0]];
for (let r = 0; r < s.length; r++) {
    const c = s[r];
    have.set(c, (have.get(c) || 0) + 1);
    if (need.has(c) && have.get(c) === need.get(c)) formed++;
    while (formed === required) {
        if (res[0] === -1 || r - l + 1 < res[0]) res = [r - l + 1, l, r];
        const lc = s[l++];
        have.set(lc, have.get(lc) - 1);
        if (need.has(lc) && have.get(lc) < need.get(lc)) formed--;
    }
}
return res[0] === -1 ? '' : s.slice(res[1], res[2] + 1);
\`\`\``,
        problems: ['longest-substring-without-repeating', 'minimum-window-substring']
      }
    ]
  },
  {
    id: 'stack-queue',
    title: 'Stack & Queue',
    description: 'LIFO and FIFO structures for evaluating expressions, BFS/DFS traversal, and monotonic optimizations.',
    icon: <Layers size={24} />,
    color: '#f59e0b',
    colorDim: 'rgba(245, 158, 11, 0.1)',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    tags: ['Stack', 'Queue', 'LIFO', 'FIFO'],
    totalProblems: 0,
    modules: [
      {
        id: 'basic-stack',
        title: 'Stack Fundamentals (LIFO)',
        description: 'Push/pop mechanics, expression evaluation, and infix-to-postfix conversion.',
        tutorial: `### Stack — Last In, First Out (LIFO)
A stack is like a stack of plates: you can only add or remove from the **top**.

| Operation | Description | Cost |
|---|---|---|
| \`push(x)\` | Add element to top | O(1) |
| \`pop()\` | Remove top element | O(1) |
| \`peek()\` | View top without removing | O(1) |
| \`isEmpty()\` | Check if empty | O(1) |

### Key Applications
1. **Balanced Parentheses**
2. **Infix → Postfix Conversion**
3. **Postfix Expression Evaluation**

### Valid Parentheses — Step by Step
\`\`\`
Input: "{[()]}"
Push '{' → stack: ['{']
Push '[' → stack: ['{', '[']
Push '(' → stack: ['{', '[', '(']
See ')'  → pop '(' → match! → stack: ['{', '[']
See ']'  → pop '[' → match! → stack: ['{']
See '}'  → pop '{' → match! → stack: []
Stack empty → VALID ✓
\`\`\`

### Infix to Postfix Conversion Rules
1. Operand → output directly.
2. Operator → pop higher/equal precedence operators to output, then push current.
3. \`(\` → push to stack.
4. \`)\` → pop and output until \`(\` is found; discard \`(\`.
5. End → pop all remaining operators.

**Example:** Convert \`A + B * C\`
\`\`\`
Read A  → Output: A
Read +  → Stack: [+]
Read B  → Output: A B
Read *  → * has higher precedence than + → Stack: [+, *]
Read C  → Output: A B C
End     → Pop all → Output: A B C * +
\`\`\`

### Postfix Evaluation
\`\`\`
Evaluate: 5 3 +
Push 5 → [5]
Push 3 → [5, 3]
See +  → pop 3 and 5, compute 5+3=8, push 8
Result: 8
\`\`\``,
        problems: ['valid-parentheses']
      }
    ]
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'DFS/BFS traversals, BST properties, AVL balancing, and recursive tree reasoning.',
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
        description: 'Pre-order, in-order, post-order, and BFS level-order traversal.',
        tutorial: `### Tree Terminology
| Term | Meaning |
|---|---|
| Root | The topmost node (no parent) |
| Leaf | A node with no children |
| Height | Longest path from root to any leaf |
| Depth | Distance of a node from the root |
| Complete Binary Tree | All levels filled except possibly the last, filled left-to-right |
| Full Binary Tree | Every node has 0 or exactly 2 children |

### Three DFS Traversal Orders
Recursion visits the **current node** at different points:

\`\`\`javascript
// Pre-order: Root → Left → Right
function preorder(node) {
    if (!node) return;
    visit(node);      // ← process NOW (before children)
    preorder(node.left);
    preorder(node.right);
}

// In-order: Left → Root → Right
function inorder(node) {
    if (!node) return;
    inorder(node.left);
    visit(node);      // ← process BETWEEN children
    inorder(node.right);
}

// Post-order: Left → Right → Root
function postorder(node) {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    visit(node);      // ← process AFTER children
}
\`\`\`

### Traversal Result on a Sample Tree
\`\`\`
      5
     / \\
    3   8
   /
  1
In-order:   1, 3, 5, 8   (sorted order for BSTs!)
Pre-order:  5, 3, 1, 8
Post-order: 1, 3, 8, 5
\`\`\`

### Maximum Depth — The Recursive Insight
The depth of a tree is 1 + max(depth of left child, depth of right child).
\`\`\`javascript
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\`

### BFS (Level-Order) using a Queue
\`\`\`javascript
const queue = [root];
while (queue.length) {
    const node = queue.shift();
    visit(node);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
}
\`\`\``,
        problems: ['invert-binary-tree', 'maximum-depth-of-binary-tree']
      },
      {
        id: 'tree-bst',
        title: 'Binary Search Trees (BST)',
        description: 'BST property, insertion, deletion, and validation.',
        tutorial: `### The BST Property
For every node \`N\`:
- All nodes in the **left subtree** are strictly **less than** N's value.
- All nodes in the **right subtree** are strictly **greater than** N's value.

This enables O(log N) average-case search, insert, and delete.

### Step-by-Step Insertion — Insert 5, 3, 8, 1
\`\`\`
Insert 5 → Root = 5
Insert 3 → 3 < 5 → goes LEFT of 5
Insert 8 → 8 > 5 → goes RIGHT of 5
Insert 1 → 1 < 5 → 1 < 3 → goes LEFT of 3

Result:
      5
     / \\
    3   8
   /
  1
\`\`\`

### BST Deletion — Three Cases
1. **Leaf node** → simply remove it.
2. **One child** → replace the node with its single child.
3. **Two children** → find the **in-order successor** (smallest node in right subtree), copy its value into the current node, then delete the successor.

**Example:** Delete 3 (has children 1 and 4):
\`\`\`
In-order successor of 3 = 4
Replace 3's value with 4, then delete the original 4 node.
\`\`\`

### AVL Trees — Self-Balancing BST
An AVL tree maintains a **balance factor** = height(left) − height(right) at every node. If this ever becomes +2 or −2 after an insertion, rotations are performed.

| Imbalance | Fix |
|---|---|
| Left-Left | Single **Right** Rotation |
| Right-Right | Single **Left** Rotation |
| Left-Right | Left Rotation, then Right Rotation |
| Right-Left | Right Rotation, then Left Rotation |

**Example — Inserting 30, 20, 10 (Left-Left case):**
\`\`\`
After inserting 10:    30       ← balance factor = +2 (unbalanced)
                      /
                     20
                    /
                   10

Apply Right Rotation:
         20
        /  \\
       10   30   ← Balanced! ✓
\`\`\``,
        problems: ['lowest-common-ancestor-of-a-binary-search-tree', 'validate-binary-search-tree']
      }
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Trade space for time by caching subproblem results — Memoization (top-down) and Tabulation (bottom-up).',
    icon: <Zap size={24} />,
    color: '#ef4444',
    colorDim: 'rgba(239, 68, 68, 0.1)',
    difficulty: 'Advanced',
    estimatedHours: 20,
    tags: ['DP', 'Memoization', 'Tabulation'],
    totalProblems: 0,
    modules: [
      {
        id: 'dp-1d',
        title: '1D Dynamic Programming',
        description: 'Fibonacci, Climbing Stairs, House Robber — single-variable state transitions.',
        tutorial: `### What is Dynamic Programming?
DP is **optimized recursion**. When a recursive algorithm recalculates the same subproblems over and over, you cache those results to avoid redundant work.

There are two equivalent approaches:
- **Memoization (Top-Down):** Recursive + cache. Solve subproblems only when needed.
- **Tabulation (Bottom-Up):** Iterative. Fill in the answer table from base cases upward.

### Example 1: Fibonacci Sequence
Naive recursion is O(2ⁿ). DP reduces it to O(N).

\`\`\`javascript
// Tabulation (Bottom-Up)
const dp = [0, 1];
for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}
return dp[n];
\`\`\`

### Example 2: Climbing Stairs
To reach step N, you came from step N-1 or N-2.
\`\`\`
ways(N) = ways(N-1) + ways(N-2)
\`\`\`
This is literally the Fibonacci recurrence — same O(N) DP solution.

### Example 3: House Robber
Can't rob two adjacent houses. At each house, choose to rob it (gain \`nums[i] + dp[i-2]\`) or skip it (gain \`dp[i-1]\`).
\`\`\`javascript
let prev2 = 0, prev1 = 0;
for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
}
return prev1;
\`\`\`

### Example 4: Coin Change
Minimum coins to make amount. Classic unbounded knapsack.
\`\`\`javascript
const dp = new Array(amount + 1).fill(Infinity);
dp[0] = 0; // Base case: 0 coins needed to make amount 0
for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
        if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
}
return dp[amount] === Infinity ? -1 : dp[amount];
\`\`\`

### The 3-Step DP Framework
1. **Define the state:** What does \`dp[i]\` represent?
2. **Find the recurrence:** How does \`dp[i]\` relate to smaller subproblems?
3. **Identify base cases:** What are the trivially known answers?`,
        problems: ['climbing-stairs', 'house-robber', 'coin-change', 'longest-increasing-subsequence']
      }
    ]
  },
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    description: 'Complete guide to all major sorting algorithms, their complexities, and binary search mastery.',
    icon: <Search size={24} />,
    color: '#06b6d4',
    colorDim: 'rgba(6, 182, 212, 0.1)',
    difficulty: 'Beginner-Intermediate',
    estimatedHours: 10,
    tags: ['Sorting', 'Binary Search', 'Searching'],
    totalProblems: 0,
    modules: [
      {
        id: 'sorting-algorithms',
        title: 'All Major Sorting Algorithms',
        description: 'Bubble, Insertion, Selection, Merge, Quick, Heap, Shell, and Radix Sort.',
        tutorial: `### Sorting Algorithm Complexity Reference
| Algorithm | Best | Average | Worst | Stable? | Key Idea |
|---|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | ✓ | Swap adjacent pairs |
| Insertion | O(n) | O(n²) | O(n²) | ✓ | Build sorted prefix |
| Selection | O(n²) | O(n²) | O(n²) | ✗ | Find min each pass |
| Merge | O(n log n) | O(n log n) | O(n log n) | ✓ | Divide & merge |
| Quick | O(n log n) | O(n log n) | O(n²) | ✗ | Partition around pivot |
| Heap | O(n log n) | O(n log n) | O(n log n) | ✗ | Max-heap extraction |
| Radix | O(nk) | O(nk) | O(nk) | ✓ | Sort by each digit |

---
### Bubble Sort — Step-by-Step
Compare adjacent pairs; largest "bubbles" to the end each pass.
\`\`\`
Input:  [5, 1, 4, 2]
Pass 1: [1, 5, 4, 2] → [1, 4, 5, 2] → [1, 4, 2, 5]
Pass 2: [1, 4, 2, 5] → [1, 2, 4, 5]
Sorted: [1, 2, 4, 5]
\`\`\`

### Insertion Sort — Step-by-Step
Take each element and insert it into its correct position in the already-sorted prefix.
\`\`\`
Start:    [9, 5, 1, 4]
Insert 5: [5, 9, 1, 4]   ← 5 < 9, shift 9 right
Insert 1: [1, 5, 9, 4]   ← 1 < 9, 1 < 5, shift both
Insert 4: [1, 4, 5, 9]   ← 4 < 9, 4 < 5, shift both
\`\`\`
*Best when nearly sorted — behaves like O(n) in that case.*

### Merge Sort — Divide & Conquer
\`\`\`
Input: [6, 3, 9, 1]
Divide: [6, 3] and [9, 1]
Sort:   [3, 6] and [1, 9]
Merge:  [1, 3, 6, 9]
\`\`\`

### Heap Sort — Using a Max-Heap
\`\`\`
Input: [4, 10, 3, 5, 1]
Build Max-Heap: [10, 5, 3, 4, 1]
Swap 10 with last → Heapify → [5, 4, 3, 1] + sorted:[10]
Swap 5  with last → Heapify → [4, 1, 3]    + sorted:[5, 10]
... → Sorted: [1, 3, 4, 5, 10]
\`\`\`

### Radix Sort — By Digit (LSD)
\`\`\`
Input: [170, 45, 75, 90, 802, 24]
Pass 1 (units):    170, 90, 802, 24, 45, 75
Pass 2 (tens):     802, 24, 45, 170, 75, 90
Pass 3 (hundreds): 24, 45, 75, 90, 170, 802
Result: [24, 45, 75, 90, 170, 802]
\`\`\`
*Never compares elements directly — runs in O(nk) linear time.*`,
        problems: ['best-time-to-buy-and-sell-stock']
      },
      {
        id: 'binary-search',
        title: 'Binary Search Mastery',
        description: 'Linear, binary, and interpolation search with full worked examples.',
        tutorial: `### Linear Search — O(N)
Check each element one by one until found.
\`\`\`
Search for 23 in [4, 10, 23, 8]:
4  → no match
10 → no match
23 → FOUND at index 2 ✓
\`\`\`

### Binary Search — O(log N)
Requires a **sorted** array. Eliminate half the search space each step.

**Steps:**
1. Set \`low = 0\`, \`high = n - 1\`.
2. Find \`mid = Math.floor((low + high) / 2)\`.
3. If \`A[mid] === target\` → found!
4. If \`target < A[mid]\` → search left (\`high = mid - 1\`).
5. If \`target > A[mid]\` → search right (\`low = mid + 1\`).
6. If \`low > high\` → not found.

**Example:** Search for 17 in \`[2, 5, 8, 12, 17, 23, 38]\`:
\`\`\`
low=0, high=6 → mid=3 → A[3]=12 < 17 → search right
low=4, high=6 → mid=5 → A[5]=23 > 17 → search left
low=4, high=4 → mid=4 → A[4]=17 → FOUND ✓  (only 3 steps!)
\`\`\`

\`\`\`javascript
function binarySearch(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
\`\`\`

### Interpolation Search — O(log log N) for uniform data
Estimates the position instead of always picking the midpoint:
\`\`\`
pos = low + ((target - A[low]) × (high - low)) / (A[high] - A[low])
\`\`\`
Performs much better than binary search when data is uniformly distributed.

### Binary Search on the Answer
Binary search isn't just for arrays! Many optimization problems (e.g., "find the minimum X such that condition(X) is true") can be solved by binary searching on the answer space itself.`,
        problems: ['valid-palindrome']
      }
    ]
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Dynamic, pointer-based linear structures — singly, doubly, and circular linked lists.',
    icon: <Link2 size={24} />,
    color: '#f97316',
    colorDim: 'rgba(249, 115, 22, 0.1)',
    difficulty: 'Beginner-Intermediate',
    estimatedHours: 8,
    tags: ['Linked List', 'Pointers', 'Recursion'],
    totalProblems: 0,
    modules: [
      {
        id: 'linked-list-basics',
        title: 'Singly & Doubly Linked Lists',
        description: 'Node structure, insertion, deletion, traversal, and reversal.',
        tutorial: `### What is a Linked List?
An array's weakness is its **fixed size** and **O(N) insertion/deletion** (due to shifting). A linked list solves this by storing elements in **nodes** scattered throughout memory, each containing:
- **Data** — the actual value.
- **Next pointer** — address of the next node.

No contiguous memory required. Size grows and shrinks dynamically.

### Node Structure in C
\`\`\`c
struct Node {
    int data;
    struct Node *next;
};
\`\`\`

### Types of Linked Lists
| Type | Description |
|---|---|
| Singly Linked | Each node points only to the next node |
| Circular Linked | Last node points back to the first |
| Doubly Linked | Each node has both \`next\` AND \`prev\` pointers |
| Circular Doubly | Combines circular and doubly properties |

### Inserting at the Beginning — O(1)
\`\`\`c
struct Node *newNode = malloc(sizeof(struct Node));
newNode->data = 10;
newNode->next = head;   // Point new node to old head
head = newNode;         // Update head
\`\`\`
Unlike arrays, no shifting required! This is **O(1)**.

### Deleting a Node — Step by Step
\`\`\`c
struct Node *temp = head, *prev = NULL;
while (temp != NULL && temp->data != target) {
    prev = temp;
    temp = temp->next;
}
// temp points to the node to delete
if (prev == NULL) head = temp->next; // Deleting the head
else prev->next = temp->next;        // Bypass the node
free(temp);
\`\`\`

### Advantages of Doubly Linked List
Each node has both \`next\` and \`prev\`:
- Traverse **forward and backward**.
- Delete a **known** node in O(1) without scanning from head.

### The Josephus Problem (Circular Linked List Application)
N people in a circle; every K-th person is eliminated.
**Example:** 5 people, k=2 (eliminate every 2nd):
\`\`\`
People: 1 → 2 → 3 → 4 → 5 → (back to 1)
Eliminate 2 → remaining: 1, 3, 4, 5
Eliminate 4 → remaining: 1, 3, 5
Eliminate 1 → remaining: 3, 5
Eliminate 5 → Survivor = 3
\`\`\`

### Linked List vs Array: Quick Comparison
| Feature | Array | Linked List |
|---|---|---|
| Access by index | O(1) | O(N) |
| Insert at beginning | O(N) | O(1) |
| Memory | Contiguous | Scattered + overhead |
| Cache performance | Better | Worse |`,
        problems: ['valid-palindrome']
      }
    ]
  },
];

// Fallback tutorial
TRACKS.forEach(t => {
  t.modules.forEach(m => {
    if (!m.tutorial) {
      m.tutorial = `### Understanding ${m.title}\n\nThis module covers fundamental concepts in ${m.title.toLowerCase()}.\n\n### Key Takeaways\n- Consider edge cases before coding.\n- Analyze Time (Big O) and Space complexity.\n- Solve on paper first, then code.`;
    }
  });
});

// Initialize total problem counts
TRACKS.forEach(t => {
  t.totalProblems = t.modules.reduce((sum, m) => sum + m.problems.length, 0);
});

export function getTrackById(id) {
  return TRACKS.find(t => t.id === id);
}

export function getTotalProblems() {
  return TRACKS.reduce((sum, t) => sum + t.totalProblems, 0);
}
