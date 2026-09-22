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
        tutorial: `### What is an Array?
An array is a foundational data structure that consists of a collection of elements, each identified by an array index or key. Arrays are stored in **contiguous memory locations**. This means that when an array is created, it claims a single, unbroken block of memory in your computer's RAM.

### Deep Dive into Time Complexity
Understanding *why* operations take a certain amount of time is crucial for interviews:
- **Access (Read/Write): O(1)** - Since elements are next to each other, the computer can instantly calculate the exact memory address of any element using the formula: \`Address = BaseAddress + (Index * ElementSize)\`.
- **Search: O(N)** - Without prior knowledge of where an element is (or if the array is unsorted), you must check every single element one by one.
- **Insertion/Deletion: O(N)** - If you want to insert an element at the beginning or middle of an array, you have to physically move all subsequent elements one space to the right to make room. This shifting process takes O(N) time.

### Static vs Dynamic Arrays
1. **Static Arrays:** Have a fixed size allocated upfront. If you create a static array of size 5, you can never put a 6th element in it.
2. **Dynamic Arrays:** (Like JavaScript's \`Array\`, Python's \`list\`, or C++'s \`std::vector\`) automatically resize themselves. When they get full, they typically allocate a brand new block of memory that is **double** the size, copy all old elements over, and then add the new element. This resizing operation is O(N), but because it happens infrequently, the *amortized* insertion time remains O(1).

### Pro-Tip for Interviews
Whenever you are asked to solve an array problem, always ask the interviewer:
- "Is the array sorted?" (If yes, think Binary Search or Two Pointers).
- "Can the array contain negative numbers?"
- "Can I modify the array in-place?"`,
        problems: ['contains-duplicate', 'valid-anagram'] 
      },
      { 
        id: 'arr-hashing', 
        title: 'Hash Maps & Sets', 
        description: 'Using hashing for fast lookups and frequency counting.',
        tutorial: `### The Power of Hash Maps
A Hash Map (or Hash Table, Dictionary) is arguably the most important data structure for coding interviews. It maps keys to values for highly efficient lookup, achieving **O(1) average time complexity** for insertions, deletions, and searches.

### How it Works Under the Hood
1. When you insert a Key-Value pair, the Key goes through a **Hash Function**.
2. The Hash Function converts the Key into an integer (a hash code).
3. This integer is used as an index to store the Value in a hidden underlying array.
4. If two different keys produce the same index, a **Collision** occurs. Hash maps handle this usually by chaining (storing a linked list at that index) or open addressing (finding the next empty slot).

### Common Interview Patterns
1. **Frequency Counting (The Histogram Pattern):** 
   Iterate through an array and store the count of each element.
   \`\`\`javascript
   const count = new Map();
   for (let num of nums) {
       count.set(num, (count.get(num) || 0) + 1);
   }
   \`\`\`
   *Use Case:* Valid Anagram, Majority Element.

2. **The Complement Search:** 
   When looking for a pair that meets a condition (e.g., sums to X), as you iterate, check if \`X - current_element\` already exists in your hash map.
   \`\`\`javascript
   const seen = new Set();
   for (let num of nums) {
       let complement = target - num;
       if (seen.has(complement)) return true;
       seen.add(num);
   }
   \`\`\`
   *Use Case:* Two Sum.

### Space-Time Tradeoff
Hash maps are the ultimate example of the **Space-Time Tradeoff**. You are trading O(N) extra space (to store the hash map) in order to reduce your time complexity from O(N²) down to O(N).`,
        problems: ['two-sum', 'group-anagrams'] 
      },
      { 
        id: 'arr-advanced', 
        title: 'Advanced Array Techniques', 
        description: 'Prefix sums, sorting, and in-place manipulations.',
        tutorial: `### Prefix Sums
A prefix sum array is an array where each element at index \`i\` is the sum of all elements from the start up to \`i\`. 
This is extremely useful for answering range-sum queries in O(1) time after an O(N) preprocessing step.

**Algorithm:**
\`\`\`javascript
let prefix = new Array(nums.length);
prefix[0] = nums[0];
for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i-1] + nums[i];
}
// Sum between indices L and R is simply: prefix[R] - prefix[L-1]
\`\`\`

### In-Place Operations
Many advanced array problems ask you to modify the array "in-place", meaning you must achieve an O(1) space complexity.
- **Swapping:** Moving non-zero elements to the end by maintaining a \`write\` pointer and a \`read\` pointer.
- **Cycle Sort:** Used when dealing with arrays containing numbers in a specific range from \`1\` to \`N\`.

### Bucket Sort
When you need to sort an array but a standard O(N log N) sort is too slow, look for constraints that allow **Bucket Sort** (O(N) time).
If you know the maximum possible value is small, or you are sorting by frequency (which can never exceed the length of the array), you can create an array of "buckets" where the index represents the value/frequency.`,
        problems: ['top-k-frequent-elements', 'product-except-self', 'longest-consecutive-sequence'] 
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
        tutorial: `### The Opposite Ends Pattern
The Two Pointer technique is an incredibly powerful tool for optimizing O(N²) solutions down to O(N). The most common variation is placing pointers at opposite ends of a **sorted** array.

### How it Works
1. Place \`left = 0\` and \`right = array.length - 1\`.
2. Evaluate the condition using the elements at both pointers.
3. Move one (or both) pointers inward based on the result, until they meet (\`left < right\`).

### Classic Example: Two Sum II (Sorted Array)
If the sum of \`nums[left] + nums[right]\` is **larger** than the target, we need a smaller sum. Because the array is sorted, we can only get a smaller sum by decrementing the \`right\` pointer.
If the sum is **smaller**, we increment the \`left\` pointer.

\`\`\`javascript
let left = 0;
let right = nums.length - 1;

while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum > target) right--; // We need a smaller sum
    if (sum < target) left++;  // We need a larger sum
}
\`\`\`

### When to use this pattern?
- When dealing with **Sorted Arrays** and searching for pairs or triplets.
- Reversing a string or array in-place.
- Checking if a string is a palindrome.`,
        problems: ['valid-palindrome', 'three-sum'] 
      },
      { 
        id: 'tp-water', 
        title: 'Container & Trapping', 
        description: 'Optimizing area and trapped volume calculations.',
        tutorial: `### Area and Volume Calculations
A specific subset of Two Pointer problems involves calculating area or trapping elements (like water). These problems rely on a greedy approach.

### Container With Most Water
You want to maximize \`Area = Width * Height\`.
- **Width** is determined by the distance between the two pointers: \`right - left\`.
- **Height** is bottlenecked by the shorter of the two lines: \`Math.min(height[left], height[right])\`.

**The Greedy Strategy:**
Start with the maximum possible width (pointers at opposite ends). The only way to possibly find a larger area is to find a taller line. Therefore, always move the pointer that is currently pointing to the **shorter** line inward.

### Trapping Rain Water
This is the Hard difficulty evolution of the container problem. Instead of area between two lines, you are calculating volume trapped above each individual bar.
Water trapped at index \`i\` is determined by: \`Math.min(max_left_height, max_right_height) - current_height\`.
Using two pointers, we can keep track of the \`maxLeft\` and \`maxRight\` seen so far, and dynamically calculate the trapped water in a single O(N) pass.`,
        problems: ['container-with-most-water', 'trapping-rain-water'] 
      }
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
        tutorial: `### Fixed Size Sliding Window
The Sliding Window pattern is used to perform operations on a specific window size of a given array or string. It reduces the time complexity of a brute-force approach from O(N * K) to O(N).

### The Core Concept
Instead of recalculating the state (like a sum or an average) of a subarray from scratch, we can reuse the work done for the previous subarray.

When the window slides one position to the right:
1. We **remove** the influence of the element that just fell out of the left side of the window.
2. We **add** the influence of the new element that just entered the right side of the window.

### Example: Maximum Sum Subarray of Size K
\`\`\`javascript
let maxSum = 0;
let windowSum = 0;

// 1. Initialize the first window
for (let i = 0; i < k; i++) {
    windowSum += nums[i];
}
maxSum = windowSum;

// 2. Slide the window
for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // Add new, subtract old
    maxSum = Math.max(maxSum, windowSum);
}
\`\`\``,
        problems: ['best-time-to-buy-and-sell-stock'] 
      },
      { 
        id: 'sw-dynamic', 
        title: 'Dynamic Window', 
        description: 'Expanding and shrinking windows based on conditions.',
        tutorial: `### Dynamic Sliding Window
In Dynamic Window problems, the size of the window is not fixed. We need to find the longest/shortest subarray or substring that satisfies a certain condition.

### The Algorithm Pattern
We use two pointers, \`left\` and \`right\`.

1. **Expand:** Iterate the \`right\` pointer to expand the window. Add the new element to our state (e.g., update a hash map of character counts).
2. **Check Condition:** Check if the current window violates the problem's constraint (e.g., "contains duplicate characters").
3. **Shrink:** While the window is invalid, advance the \`left\` pointer to shrink the window, updating the state accordingly, until the window becomes valid again.
4. **Update Answer:** Once valid, update the maximum (or minimum) window size found so far.

### Example: Longest Substring Without Repeating Characters
\`\`\`javascript
let left = 0;
let maxLength = 0;
let set = new Set();

for (let right = 0; right < s.length; right++) {
    // Shrink window if duplicate found
    while (set.has(s[right])) {
        set.delete(s[left]);
        left++;
    }
    // Expand window
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
}
\`\`\`
This pattern is universally applicable to almost all dynamic substring problems!`,
        problems: ['longest-substring-without-repeating', 'minimum-window-substring'] 
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
