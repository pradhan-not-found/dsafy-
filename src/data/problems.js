// DSAfy - Complete Problems Database (LeetCode Mapped)

export const PROBLEMS = {
  // ── Arrays & Hashing ──────────────────────────────────────────────
  'contains-duplicate': {
    id: 'contains-duplicate',
    lcId: 217,
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    track: 'arrays-hashing',
    module: 'intro-arrays',
    tags: ['Array', 'Hash Table', 'Sorting'],
    acceptance: 61.3,
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.

**Example 1:**
\`\`\`
Input: nums = [1,2,3,1]
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,3,4]
Output: false
\`\`\`

**Constraints:**
- 1 ≤ nums.length ≤ 10⁵
- -10⁹ ≤ nums[i] ≤ 10⁹`,
    hints: [
      'Try using a Set to track seen numbers.',
      'A HashSet allows O(1) average lookup.',
      'If you see a number that is already in the set, return true.',
    ],
    examples: [
      { input: '[1,2,3,1]', output: 'true', explanation: '1 appears twice' },
      { input: '[1,2,3,4]', output: 'false', explanation: 'No duplicates' },
      { input: '[1,1,1,3,3,4,3,2,4,2]', output: 'true', explanation: 'Multiple duplicates' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    // Your solution here
};`,
      python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        # Your solution here
        pass`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Your solution here
    }
};`,
    },
    solution: `var containsDuplicate = function(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '[1,2,3,1]', expected: 'true' },
      { input: '[1,2,3,4]', expected: 'false' },
      { input: '[1,1,1,3,3,4,3,2,4,2]', expected: 'true' },
    ],
  },

  'two-sum': {
    id: 'two-sum',
    lcId: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    track: 'arrays-hashing',
    module: 'intro-arrays',
    tags: ['Array', 'Hash Table'],
    acceptance: 52.6,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

**Example:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9
\`\`\``,
    hints: [
      'A brute force O(n²) solution works but is too slow.',
      'Use a hash map to store number → index.',
      'For each number, check if (target - number) exists in the map.',
    ],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
    },
    solution: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: 'nums=[2,7,11,15], target=9', expected: '[0,1]' },
      { input: 'nums=[3,2,4], target=6', expected: '[1,2]' },
    ],
  },

  'valid-anagram': {
    id: 'valid-anagram',
    lcId: 242,
    title: 'Valid Anagram',
    difficulty: 'Easy',
    track: 'arrays-hashing',
    module: 'intro-arrays',
    tags: ['Hash Table', 'String', 'Sorting'],
    acceptance: 63.8,
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

**Example:**
\`\`\`
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\``,
    hints: [
      'Count character frequencies in both strings.',
      'Use an array of size 26 for lowercase letters.',
    ],
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    starterCode: {
      javascript: `var isAnagram = function(s, t) {
    
};`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        
    }
};`,
    },
    solution: `var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(c => c === 0);
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 's="anagram", t="nagaram"', expected: 'true' },
      { input: 's="rat", t="car"', expected: 'false' },
    ],
  },

  'group-anagrams': {
    id: 'group-anagrams',
    lcId: 49,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    track: 'arrays-hashing',
    module: 'hashmaps',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    acceptance: 67.3,
    description: `Given an array of strings \`strs\`, group the anagrams together.

**Example:**
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\``,
    hints: [
      'Two strings are anagrams if their sorted versions are equal.',
      'Use a hash map where key = sorted string, value = list of anagrams.',
    ],
    examples: [
      { input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    ],
    starterCode: {
      javascript: `var groupAnagrams = function(strs) {
    
};`,
      python: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        
    }
};`,
    },
    solution: `var groupAnagrams = function(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
};`,
    timeComplexity: 'O(n·k log k)',
    spaceComplexity: 'O(n·k)',
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: 'grouped' },
    ],
  },

  'top-k-frequent-elements': {
    id: 'top-k-frequent-elements',
    lcId: 347,
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    track: 'arrays-hashing',
    module: 'hashmaps',
    tags: ['Array', 'Hash Table', 'Sorting', 'Heap'],
    acceptance: 62.4,
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements.

**Example:**
\`\`\`
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
\`\`\``,
    hints: [
      'Count frequencies using a hash map.',
      'Use bucket sort: create buckets indexed by frequency.',
      'Bucket sort gives O(n) time complexity.',
    ],
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
    ],
    starterCode: {
      javascript: `var topKFrequent = function(nums, k) {
    
};`,
      python: `class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        pass`,
      cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        
    }
};`,
    },
    solution: `var topKFrequent = function(nums, k) {
    const freq = new Map();
    for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
    const buckets = Array.from({length: nums.length + 1}, () => []);
    for (const [num, count] of freq) buckets[count].push(num);
    const res = [];
    for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
        res.push(...buckets[i]);
    }
    return res.slice(0, k);
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: 'nums=[1,1,1,2,2,3], k=2', expected: '[1,2]' },
    ],
  },

  'product-except-self': {
    id: 'product-except-self',
    lcId: 238,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    track: 'arrays-hashing',
    module: 'prefix-sums',
    tags: ['Array', 'Prefix Sum'],
    acceptance: 65.9,
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`. Solve it in O(n) time without division.`,
    hints: [
      'Compute prefix products from left.',
      'Compute suffix products from right.',
      'Combine both prefix and suffix products.',
    ],
    examples: [
      { input: '[1,2,3,4]', output: '[24,12,8,6]' },
    ],
    starterCode: {
      javascript: `var productExceptSelf = function(nums) {
    
};`,
      python: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        pass`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        
    }
};`,
    },
    solution: `var productExceptSelf = function(nums) {
    const n = nums.length, res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
    return res;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[1,2,3,4]', expected: '[24,12,8,6]' },
    ],
  },

  'longest-consecutive-sequence': {
    id: 'longest-consecutive-sequence',
    lcId: 128,
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    track: 'arrays-hashing',
    module: 'hashmaps',
    tags: ['Array', 'Hash Table', 'Union Find'],
    acceptance: 46.8,
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence. Must run in O(n).`,
    hints: [
      'Put all numbers in a HashSet.',
      'Only start counting from numbers that have no predecessor (num-1 not in set).',
    ],
    examples: [
      { input: '[100,4,200,1,3,2]', output: '4', explanation: '[1,2,3,4]' },
    ],
    starterCode: {
      javascript: `var longestConsecutive = function(nums) {
    
};`,
      python: `class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        
    }
};`,
    },
    solution: `var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let longest = 0;
    for (const n of set) {
        if (!set.has(n - 1)) {
            let len = 1;
            while (set.has(n + len)) len++;
            longest = Math.max(longest, len);
        }
    }
    return longest;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '[100,4,200,1,3,2]', expected: '4' },
    ],
  },

  // ── Two Pointers ────────────────────────────────────────────────────
  'valid-palindrome': {
    id: 'valid-palindrome',
    lcId: 125,
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    track: 'two-pointers',
    module: 'basic-two-pointers',
    tags: ['Two Pointers', 'String'],
    acceptance: 46.3,
    description: `A phrase is a palindrome if it reads the same forward and backward after lowercasing all letters and removing all non-alphanumeric characters.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    hints: [
      'Use two pointers: left and right.',
      'Skip non-alphanumeric characters.',
      'Compare lowercase versions.',
    ],
    examples: [
      { input: '"A man, a plan, a canal: Panama"', output: 'true' },
      { input: '"race a car"', output: 'false' },
    ],
    starterCode: {
      javascript: `var isPalindrome = function(s) {
    
};`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        
    }
};`,
    },
    solution: `var isPalindrome = function(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        while (l < r && !isAlphaNum(s[l])) l++;
        while (l < r && !isAlphaNum(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++; r--;
    }
    return true;
};
const isAlphaNum = c => /[a-zA-Z0-9]/.test(c);`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expected: 'true' },
      { input: '"race a car"', expected: 'false' },
    ],
  },

  'three-sum': {
    id: 'three-sum',
    lcId: 15,
    title: '3Sum',
    difficulty: 'Medium',
    track: 'two-pointers',
    module: 'basic-two-pointers',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    acceptance: 34.2,
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j != k\` and \`nums[i] + nums[j] + nums[k] == 0\`. The solution set must not contain duplicate triplets.`,
    hints: [
      'Sort the array first.',
      'Fix one element and use two pointers for the rest.',
      'Skip duplicate values to avoid duplicate triplets.',
    ],
    examples: [
      { input: '[-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
    ],
    starterCode: {
      javascript: `var threeSum = function(nums) {
    
};`,
      python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        
    }
};`,
    },
    solution: `var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i-1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l+1]) l++;
                while (l < r && nums[r] === nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
};`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' },
    ],
  },

  'container-with-most-water': {
    id: 'container-with-most-water',
    lcId: 11,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    track: 'two-pointers',
    module: 'advanced-two-pointers',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    acceptance: 55.2,
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines. Find two lines that together with the x-axis form a container that contains the most water.`,
    hints: [
      'Start with widest container (left=0, right=n-1).',
      'Move the pointer with the smaller height inward.',
      'This greedy approach guarantees the maximum.',
    ],
    examples: [
      { input: '[1,8,6,2,5,4,8,3,7]', output: '49' },
    ],
    starterCode: {
      javascript: `var maxArea = function(height) {
    
};`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        
    }
};`,
    },
    solution: `var maxArea = function(height) {
    let l = 0, r = height.length - 1, max = 0;
    while (l < r) {
        max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++; else r--;
    }
    return max;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expected: '49' },
    ],
  },

  'trapping-rain-water': {
    id: 'trapping-rain-water',
    lcId: 42,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    track: 'two-pointers',
    module: 'advanced-two-pointers',
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
    acceptance: 60.3,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    hints: [
      'For each bar, water = min(maxLeft, maxRight) - height[i].',
      'Two pointer: track maxLeft and maxRight as you go.',
      'Move the pointer with smaller max inward.',
    ],
    examples: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
    ],
    starterCode: {
      javascript: `var trap = function(height) {
    
};`,
      python: `class Solution:
    def trap(self, height: List[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        
    }
};`,
    },
    solution: `var trap = function(height) {
    let l = 0, r = height.length - 1, maxL = 0, maxR = 0, water = 0;
    while (l < r) {
        if (height[l] <= height[r]) {
            maxL = Math.max(maxL, height[l]);
            water += maxL - height[l];
            l++;
        } else {
            maxR = Math.max(maxR, height[r]);
            water += maxR - height[r];
            r--;
        }
    }
    return water;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
    ],
  },

  // ── Sliding Window ─────────────────────────────────────────────────
  'best-time-to-buy-and-sell-stock': {
    id: 'best-time-to-buy-and-sell-stock',
    lcId: 121,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    track: 'sliding-window',
    module: 'fixed-window',
    tags: ['Array', 'Dynamic Programming'],
    acceptance: 54.3,
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    hints: [
      'Track the minimum price seen so far.',
      'At each step, the profit is prices[i] - minPrice.',
    ],
    examples: [
      { input: '[7,1,5,3,6,4]', output: '5', explanation: 'Buy at 1, sell at 6' },
    ],
    starterCode: {
      javascript: `var maxProfit = function(prices) {
    
};`,
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        
    }
};`,
    },
    solution: `var maxProfit = function(prices) {
    let minPrice = Infinity, maxProfit = 0;
    for (const p of prices) {
        minPrice = Math.min(minPrice, p);
        maxProfit = Math.max(maxProfit, p - minPrice);
    }
    return maxProfit;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[7,1,5,3,6,4]', expected: '5' },
      { input: '[7,6,4,3,1]', expected: '0' },
    ],
  },

  'longest-substring-without-repeating': {
    id: 'longest-substring-without-repeating',
    lcId: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    track: 'sliding-window',
    module: 'variable-window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    acceptance: 34.1,
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    hints: [
      'Use a sliding window with a set of current characters.',
      'When you see a duplicate, shrink the window from the left.',
    ],
    examples: [
      { input: '"abcabcbb"', output: '3', explanation: '"abc"' },
      { input: '"bbbbb"', output: '1' },
    ],
    starterCode: {
      javascript: `var lengthOfLongestSubstring = function(s) {
    
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        
    }
};`,
    },
    solution: `var lengthOfLongestSubstring = function(s) {
    const set = new Set();
    let l = 0, maxLen = 0;
    for (let r = 0; r < s.length; r++) {
        while (set.has(s[r])) { set.delete(s[l]); l++; }
        set.add(s[r]);
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m,n))',
    testCases: [
      { input: '"abcabcbb"', expected: '3' },
      { input: '"bbbbb"', expected: '1' },
    ],
  },

  'minimum-window-substring': {
    id: 'minimum-window-substring',
    lcId: 76,
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    track: 'sliding-window',
    module: 'variable-window',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    acceptance: 41.7,
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window.`,
    hints: [
      'Use two frequency maps — one for t, one for the window.',
      'Expand right pointer, shrink left when all chars of t are covered.',
    ],
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
    ],
    starterCode: {
      javascript: `var minWindow = function(s, t) {
    
};`,
      python: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        pass`,
      cpp: `class Solution {
public:
    string minWindow(string s, string t) {
        
    }
};`,
    },
    solution: `var minWindow = function(s, t) {
    if (!t.length) return '';
    const need = new Map(), have = new Map();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);
    let formed = 0, required = need.size, l = 0, res = [-1, 0, 0];
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
};`,
    timeComplexity: 'O(|s| + |t|)',
    spaceComplexity: 'O(|s| + |t|)',
    testCases: [
      { input: 's="ADOBECODEBANC", t="ABC"', expected: '"BANC"' },
    ],
  },

  // ── Stack ──────────────────────────────────────────────────────────
  'valid-parentheses': {
    id: 'valid-parentheses',
    lcId: 20,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    track: 'stack-queue',
    module: 'basic-stack',
    tags: ['String', 'Stack'],
    acceptance: 40.6,
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    hints: [
      'Use a stack.',
      'Push open brackets, pop when you see a closing one.',
      'Check if the popped bracket matches the current closing one.',
    ],
    examples: [
      { input: '"()"', output: 'true' },
      { input: '"()[]{}"', output: 'true' },
      { input: '"(]"', output: 'false' },
    ],
    starterCode: {
      javascript: `var isValid = function(s) {
    
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
    },
    solution: `var isValid = function(s) {
    const stack = [], map = {')':'(', ']':'[', '}':'{'};
    for (const c of s) {
        if ('([{'.includes(c)) stack.push(c);
        else if (stack.pop() !== map[c]) return false;
    }
    return stack.length === 0;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '"()"', expected: 'true' },
      { input: '"(]"', expected: 'false' },
    ],
  },

  'daily-temperatures': {
    id: 'daily-temperatures',
    lcId: 739,
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    track: 'stack-queue',
    module: 'monotonic-stack',
    tags: ['Array', 'Stack', 'Monotonic Stack'],
    acceptance: 67.8,
    description: `Given an array of integers \`temperatures\` representing daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i-th\` day to get a warmer temperature.`,
    hints: [
      'Use a monotonic decreasing stack.',
      'Store indices of temperatures in the stack.',
      'When you find a warmer temp, pop and calculate difference.',
    ],
    examples: [
      { input: '[73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
    ],
    starterCode: {
      javascript: `var dailyTemperatures = function(temperatures) {
    
};`,
      python: `class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        pass`,
      cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        
    }
};`,
    },
    solution: `var dailyTemperatures = function(temperatures) {
    const stack = [], res = new Array(temperatures.length).fill(0);
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length-1]]) {
            const idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }
    return res;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '[73,74,75,71,69,72,76,73]', expected: '[1,1,4,2,1,1,0,0]' },
    ],
  },

  // ── Binary Search ──────────────────────────────────────────────────
  'binary-search': {
    id: 'binary-search',
    lcId: 704,
    title: 'Binary Search',
    difficulty: 'Easy',
    track: 'binary-search',
    module: 'classic-binary-search',
    tags: ['Array', 'Binary Search'],
    acceptance: 56.6,
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\`.`,
    hints: [
      'Initialize left = 0, right = nums.length - 1.',
      'At each step, check the middle element.',
      'If target < mid, search left half; otherwise right half.',
    ],
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
    ],
    starterCode: {
      javascript: `var search = function(nums, target) {
    
};`,
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        pass`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`,
    },
    solution: `var search = function(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = (l + r) >> 1;
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
};`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'nums=[-1,0,3,5,9,12], target=9', expected: '4' },
      { input: 'nums=[-1,0,3,5,9,12], target=2', expected: '-1' },
    ],
  },

  'koko-eating-bananas': {
    id: 'koko-eating-bananas',
    lcId: 875,
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    track: 'binary-search',
    module: 'binary-search-answers',
    tags: ['Array', 'Binary Search'],
    acceptance: 47.6,
    description: `Koko loves to eat bananas. She can eat at most \`k\` bananas per hour. Return the minimum integer \`k\` such that she can eat all bananas within \`h\` hours.`,
    hints: [
      'Binary search on the answer (eating speed k).',
      'k ranges from 1 to max(piles).',
      'For a given k, check if she can finish in h hours.',
    ],
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4' },
    ],
    starterCode: {
      javascript: `var minEatingSpeed = function(piles, h) {
    
};`,
      python: `class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        pass`,
      cpp: `class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        
    }
};`,
    },
    solution: `var minEatingSpeed = function(piles, h) {
    let l = 1, r = Math.max(...piles);
    const canFinish = k => piles.reduce((hrs, p) => hrs + Math.ceil(p / k), 0) <= h;
    while (l < r) {
        const mid = (l + r) >> 1;
        if (canFinish(mid)) r = mid; else l = mid + 1;
    }
    return l;
};`,
    timeComplexity: 'O(n log m)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'piles=[3,6,7,11], h=8', expected: '4' },
    ],
  },

  // ── Linked Lists ───────────────────────────────────────────────────
  'reverse-linked-list': {
    id: 'reverse-linked-list',
    lcId: 206,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    track: 'linked-list',
    module: 'll-basics',
    tags: ['Linked List', 'Recursion'],
    acceptance: 74.6,
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    hints: [
      'Track prev, curr, and next pointers.',
      'Iterative approach: iterate and reverse each pointer.',
      'Recursive: reverse(head.next) then set head.next.next = head.',
    ],
    examples: [
      { input: '1→2→3→4→5', output: '5→4→3→2→1' },
    ],
    starterCode: {
      javascript: `var reverseList = function(head) {
    
};`,
      python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        pass`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`,
    },
    solution: `var reverseList = function(head) {
    let prev = null, curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '1→2→3→4→5', expected: '5→4→3→2→1' },
    ],
  },

  'linked-list-cycle': {
    id: 'linked-list-cycle',
    lcId: 141,
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    track: 'linked-list',
    module: 'll-cycle',
    tags: ['Hash Table', 'Linked List', 'Two Pointers'],
    acceptance: 48.8,
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it. Return \`true\` if there is a cycle, \`false\` otherwise.`,
    hints: [
      'Floyd\'s cycle detection: slow and fast pointers.',
      'If they meet, there\'s a cycle. If fast reaches null, no cycle.',
    ],
    examples: [
      { input: '3→2→0→-4→(back to 2)', output: 'true' },
    ],
    starterCode: {
      javascript: `var hasCycle = function(head) {
    
};`,
      python: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        
    }
};`,
    },
    solution: `var hasCycle = function(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'has cycle', expected: 'true' },
      { input: 'no cycle', expected: 'false' },
    ],
  },

  'lru-cache': {
    id: 'lru-cache',
    lcId: 146,
    title: 'LRU Cache',
    difficulty: 'Medium',
    track: 'linked-list',
    module: 'll-advanced',
    tags: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
    acceptance: 42.3,
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement \`get(key)\` and \`put(key, value)\` with O(1) time complexity.`,
    hints: [
      'Use a doubly-linked list + hash map combination.',
      'Map stores key → node for O(1) lookup.',
      'List maintains order: head = most recent, tail = least recent.',
    ],
    examples: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1)→1, put(3,3), get(2)→-1', output: '-1' },
    ],
    starterCode: {
      javascript: `class LRUCache {
    constructor(capacity) {
        
    }
    
    get(key) {
        
    }
    
    put(key, value) {
        
    }
}`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        pass
    def get(self, key: int) -> int:
        pass
    def put(self, key: int, value: int) -> None:
        pass`,
      cpp: `class LRUCache {
public:
    LRUCache(int capacity) {}
    int get(int key) {}
    void put(int key, int value) {}
};`,
    },
    solution: `class LRUCache {
    constructor(cap) {
        this.cap = cap;
        this.cache = new Map();
    }
    get(key) {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }
    put(key, val) {
        this.cache.delete(key);
        this.cache.set(key, val);
        if (this.cache.size > this.cap) this.cache.delete(this.cache.keys().next().value);
    }
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(capacity)',
    testCases: [],
  },

  // ── Trees ──────────────────────────────────────────────────────────
  'invert-binary-tree': {
    id: 'invert-binary-tree',
    lcId: 226,
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    track: 'trees',
    module: 'tree-traversal',
    tags: ['Tree', 'DFS', 'BFS', 'Binary Tree'],
    acceptance: 77.1,
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    hints: [
      'Swap left and right children at each node.',
      'Recursively invert subtrees.',
    ],
    examples: [
      { input: '[4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
    ],
    starterCode: {
      javascript: `var invertTree = function(root) {
    
};`,
      python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        pass`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        
    }
};`,
    },
    solution: `var invertTree = function(root) {
    if (!root) return null;
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
    return root;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    testCases: [],
  },

  'binary-tree-level-order': {
    id: 'binary-tree-level-order',
    lcId: 102,
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    track: 'trees',
    module: 'tree-bfs',
    tags: ['Tree', 'BFS', 'Binary Tree'],
    acceptance: 66.4,
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).`,
    hints: [
      'Use a queue (BFS).',
      'At each level, process all nodes in the queue.',
    ],
    examples: [
      { input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
    ],
    starterCode: {
      javascript: `var levelOrder = function(root) {
    
};`,
      python: `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        
    }
};`,
    },
    solution: `var levelOrder = function(root) {
    if (!root) return [];
    const res = [], q = [root];
    while (q.length) {
        const level = [], size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            level.push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        res.push(level);
    }
    return res;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [],
  },

  'validate-bst': {
    id: 'validate-bst',
    lcId: 98,
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    track: 'trees',
    module: 'bst',
    tags: ['Tree', 'DFS', 'Binary Search Tree'],
    acceptance: 32.5,
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).`,
    hints: [
      'Each node has a valid range: (min, max).',
      'For left subtree: max = node.val; for right subtree: min = node.val.',
    ],
    examples: [
      { input: '[2,1,3]', output: 'true' },
      { input: '[5,1,4,null,null,3,6]', output: 'false' },
    ],
    starterCode: {
      javascript: `var isValidBST = function(root) {
    
};`,
      python: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        
    }
};`,
    },
    solution: `var isValidBST = function(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    testCases: [],
  },

  'binary-tree-max-path-sum': {
    id: 'binary-tree-max-path-sum',
    lcId: 124,
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    track: 'trees',
    module: 'tree-hard',
    tags: ['Dynamic Programming', 'Tree', 'DFS', 'Binary Tree'],
    acceptance: 39.7,
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. The path does not need to pass through the root. Return the maximum path sum.`,
    hints: [
      'DFS: at each node, compute the max gain from left and right.',
      'Update global max with left + right + node.val.',
      'Return max of (node.val + left, node.val + right) to parent.',
    ],
    examples: [
      { input: '[-10,9,20,null,null,15,7]', output: '42' },
    ],
    starterCode: {
      javascript: `var maxPathSum = function(root) {
    
};`,
      python: `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int maxPathSum(TreeNode* root) {
        
    }
};`,
    },
    solution: `var maxPathSum = function(root) {
    let max = -Infinity;
    const dfs = node => {
        if (!node) return 0;
        const l = Math.max(dfs(node.left), 0);
        const r = Math.max(dfs(node.right), 0);
        max = Math.max(max, l + r + node.val);
        return node.val + Math.max(l, r);
    };
    dfs(root);
    return max;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    testCases: [],
  },

  // ── Graphs ────────────────────────────────────────────────────────
  'number-of-islands': {
    id: 'number-of-islands',
    lcId: 200,
    title: 'Number of Islands',
    difficulty: 'Medium',
    track: 'graphs',
    module: 'graph-basics',
    tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
    acceptance: 58.5,
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    hints: [
      'DFS/BFS from each unvisited land cell.',
      'Mark visited cells to avoid revisiting.',
      'Count the number of DFS/BFS invocations.',
    ],
    examples: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
    ],
    starterCode: {
      javascript: `var numIslands = function(grid) {
    
};`,
      python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        
    }
};`,
    },
    solution: `var numIslands = function(grid) {
    let count = 0;
    const dfs = (r, c) => {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
    };
    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[0].length; c++)
            if (grid[r][c] === '1') { dfs(r, c); count++; }
    return count;
};`,
    timeComplexity: 'O(m·n)',
    spaceComplexity: 'O(m·n)',
    testCases: [],
  },

  'course-schedule': {
    id: 'course-schedule',
    lcId: 207,
    title: 'Course Schedule',
    difficulty: 'Medium',
    track: 'graphs',
    module: 'advanced-graphs',
    tags: ['DFS', 'BFS', 'Graph', 'Topological Sort'],
    acceptance: 46.2,
    description: `There are \`numCourses\` courses you have to take. Some courses have prerequisites. Return true if you can finish all courses.`,
    hints: [
      'Build a directed graph.',
      'Detect cycle using DFS (3 states: unvisited, visiting, visited).',
      'If a cycle exists, you can\'t finish all courses.',
    ],
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false' },
    ],
    starterCode: {
      javascript: `var canFinish = function(numCourses, prerequisites) {
    
};`,
      python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        
    }
};`,
    },
    solution: `var canFinish = function(n, prereqs) {
    const adj = Array.from({length: n}, () => []);
    for (const [a, b] of prereqs) adj[b].push(a);
    const state = new Array(n).fill(0); // 0=unvisited, 1=visiting, 2=visited
    const dfs = node => {
        if (state[node] === 1) return false;
        if (state[node] === 2) return true;
        state[node] = 1;
        for (const nei of adj[node]) if (!dfs(nei)) return false;
        state[node] = 2;
        return true;
    };
    for (let i = 0; i < n; i++) if (!dfs(i)) return false;
    return true;
};`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    testCases: [],
  },

  // ── Dynamic Programming ────────────────────────────────────────────
  'climbing-stairs': {
    id: 'climbing-stairs',
    lcId: 70,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    track: 'dynamic-programming',
    module: 'dp-1d',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    acceptance: 52.2,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    hints: [
      'dp[i] = dp[i-1] + dp[i-2] (Fibonacci pattern).',
      'Base cases: dp[1] = 1, dp[2] = 2.',
      'Optimize space to O(1) using two variables.',
    ],
    examples: [
      { input: 'n = 2', output: '2' },
      { input: 'n = 3', output: '3' },
    ],
    starterCode: {
      javascript: `var climbStairs = function(n) {
    
};`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        pass`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,
    },
    solution: `var climbStairs = function(n) {
    let a = 1, b = 1;
    for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
    return b;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'n=2', expected: '2' },
      { input: 'n=3', expected: '3' },
    ],
  },

  'coin-change': {
    id: 'coin-change',
    lcId: 322,
    title: 'Coin Change',
    difficulty: 'Medium',
    track: 'dynamic-programming',
    module: 'knapsack',
    tags: ['Array', 'Dynamic Programming', 'BFS'],
    acceptance: 43.2,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money. Return the fewest number of coins needed to make up that amount.`,
    hints: [
      'dp[i] = minimum coins to make amount i.',
      'dp[0] = 0, dp[i] = min(dp[i - coin] + 1) for each coin.',
    ],
    examples: [
      { input: 'coins = [1,5,11], amount = 11', output: '1' },
      { input: 'coins = [1,3,4,5], amount = 7', output: '2' },
    ],
    starterCode: {
      javascript: `var coinChange = function(coins, amount) {
    
};`,
      python: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        pass`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        
    }
};`,
    },
    solution: `var coinChange = function(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++)
        for (const c of coins)
            if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
    return dp[amount] === Infinity ? -1 : dp[amount];
};`,
    timeComplexity: 'O(amount × coins)',
    spaceComplexity: 'O(amount)',
    testCases: [
      { input: 'coins=[1,5,11], amount=11', expected: '1' },
    ],
  },

  'longest-common-subsequence': {
    id: 'longest-common-subsequence',
    lcId: 1143,
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    track: 'dynamic-programming',
    module: 'dp-2d',
    tags: ['String', 'Dynamic Programming'],
    acceptance: 57.1,
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence.`,
    hints: [
      'dp[i][j] = LCS of text1[:i] and text2[:j].',
      'If text1[i] == text2[j]: dp[i][j] = dp[i-1][j-1] + 1.',
      'Otherwise: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
    ],
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3' },
    ],
    starterCode: {
      javascript: `var longestCommonSubsequence = function(text1, text2) {
    
};`,
      python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        pass`,
      cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        
    }
};`,
    },
    solution: `var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = text1[i-1] === text2[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
};`,
    timeComplexity: 'O(m·n)',
    spaceComplexity: 'O(m·n)',
    testCases: [],
  },

  'maximum-subarray': {
    id: 'maximum-subarray',
    lcId: 53,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    track: 'dynamic-programming',
    module: 'dp-sequences',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    acceptance: 50.3,
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum. (Kadane's Algorithm)`,
    hints: [
      'Track current sum and reset to 0 if it goes negative.',
      'maxSum = max(maxSum, currentSum + nums[i]).',
    ],
    examples: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1]' },
    ],
    starterCode: {
      javascript: `var maxSubArray = function(nums) {
    
};`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        
    }
};`,
    },
    solution: `var maxSubArray = function(nums) {
    let maxSum = nums[0], curr = nums[0];
    for (let i = 1; i < nums.length; i++) {
        curr = Math.max(nums[i], curr + nums[i]);
        maxSum = Math.max(maxSum, curr);
    }
    return maxSum;
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
    ],
  },

  // ── Backtracking ───────────────────────────────────────────────────
  'subsets': {
    id: 'subsets',
    lcId: 78,
    title: 'Subsets',
    difficulty: 'Medium',
    track: 'backtracking',
    module: 'basic-backtracking',
    tags: ['Array', 'Backtracking', 'Bit Manipulation'],
    acceptance: 77.9,
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.`,
    hints: [
      'Backtrack: at each index, choose to include or exclude.',
      'Start with empty subset, recurse through all elements.',
    ],
    examples: [
      { input: '[1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
    ],
    starterCode: {
      javascript: `var subsets = function(nums) {
    
};`,
      python: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        
    }
};`,
    },
    solution: `var subsets = function(nums) {
    const res = [], curr = [];
    const bt = i => {
        if (i === nums.length) { res.push([...curr]); return; }
        curr.push(nums[i]); bt(i + 1);
        curr.pop(); bt(i + 1);
    };
    bt(0);
    return res;
};`,
    timeComplexity: 'O(2ⁿ)',
    spaceComplexity: 'O(n)',
    testCases: [],
  },

  'combination-sum': {
    id: 'combination-sum',
    lcId: 39,
    title: 'Combination Sum',
    difficulty: 'Medium',
    track: 'backtracking',
    module: 'basic-backtracking',
    tags: ['Array', 'Backtracking'],
    acceptance: 70.4,
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of candidates where the chosen numbers sum to \`target\`. Each number may be used an unlimited number of times.`,
    hints: [
      'Backtrack with remaining target.',
      'Reuse same element by not incrementing index.',
    ],
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
    ],
    starterCode: {
      javascript: `var combinationSum = function(candidates, target) {
    
};`,
      python: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        
    }
};`,
    },
    solution: `var combinationSum = function(candidates, target) {
    const res = [], curr = [];
    const bt = (i, rem) => {
        if (rem === 0) { res.push([...curr]); return; }
        if (i >= candidates.length || rem < 0) return;
        curr.push(candidates[i]);
        bt(i, rem - candidates[i]);
        curr.pop();
        bt(i + 1, rem);
    };
    bt(0, target);
    return res;
};`,
    timeComplexity: 'O(2^(t/m))',
    spaceComplexity: 'O(t/m)',
    testCases: [],
  },

  'n-queens': {
    id: 'n-queens',
    lcId: 51,
    title: 'N-Queens',
    difficulty: 'Hard',
    track: 'backtracking',
    module: 'complex-backtracking',
    tags: ['Array', 'Backtracking'],
    acceptance: 68.8,
    description: `The n-queens puzzle is the problem of placing \`n\` queens on an \`n×n\` chessboard such that no two queens attack each other. Return all distinct solutions.`,
    hints: [
      'Track occupied columns, positive diagonals, and negative diagonals.',
      'For each row, try placing a queen in each valid column.',
    ],
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
    ],
    starterCode: {
      javascript: `var solveNQueens = function(n) {
    
};`,
      python: `class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        
    }
};`,
    },
    solution: `var solveNQueens = function(n) {
    const res = [], board = Array.from({length:n}, () => '.'.repeat(n).split(''));
    const cols = new Set(), posDiag = new Set(), negDiag = new Set();
    const bt = row => {
        if (row === n) { res.push(board.map(r => r.join(''))); return; }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || posDiag.has(row+col) || negDiag.has(row-col)) continue;
            cols.add(col); posDiag.add(row+col); negDiag.add(row-col);
            board[row][col] = 'Q';
            bt(row + 1);
            board[row][col] = '.';
            cols.delete(col); posDiag.delete(row+col); negDiag.delete(row-col);
        }
    };
    bt(0);
    return res;
};`,
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n)',
    testCases: [],
  },

  // ── Heaps ─────────────────────────────────────────────────────────
  'kth-largest-element': {
    id: 'kth-largest-element',
    lcId: 215,
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    track: 'heaps',
    module: 'heap-basics',
    tags: ['Array', 'Divide and Conquer', 'Sorting', 'Heap', 'Quickselect'],
    acceptance: 66.9,
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k-th\` largest element in the array.`,
    hints: [
      'Use a min-heap of size k.',
      'The root of the heap is the k-th largest.',
      'Alternatively, use QuickSelect for O(n) average.',
    ],
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
    ],
    starterCode: {
      javascript: `var findKthLargest = function(nums, k) {
    
};`,
      python: `class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        pass`,
      cpp: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        
    }
};`,
    },
    solution: `var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
};`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    testCases: [],
  },

  // ── Tries ─────────────────────────────────────────────────────────
  'implement-trie': {
    id: 'implement-trie',
    lcId: 208,
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    track: 'tries',
    module: 'trie-basics',
    tags: ['Hash Table', 'String', 'Design', 'Trie'],
    acceptance: 63.8,
    description: `A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class with insert, search, and startsWith.`,
    hints: [
      'Each node has children[26] for lowercase letters.',
      'Mark nodes as end of word.',
    ],
    examples: [
      { input: 'insert("apple"), search("apple")→true, search("app")→false, startsWith("app")→true', output: 'true/false/true' },
    ],
    starterCode: {
      javascript: `class Trie {
    constructor() {
        
    }
    insert(word) {
        
    }
    search(word) {
        
    }
    startsWith(prefix) {
        
    }
}`,
      python: `class Trie:
    def __init__(self):
        pass
    def insert(self, word: str) -> None:
        pass
    def search(self, word: str) -> bool:
        pass
    def startsWith(self, prefix: str) -> bool:
        pass`,
      cpp: `class Trie {
public:
    Trie() {}
    void insert(string word) {}
    bool search(string word) {}
    bool startsWith(string prefix) {}
};`,
    },
    solution: `class Trie {
    constructor() { this.root = {}; }
    insert(word) {
        let node = this.root;
        for (const c of word) node = node[c] ??= {};
        node['#'] = true;
    }
    search(word) {
        let node = this.root;
        for (const c of word) { if (!node[c]) return false; node = node[c]; }
        return !!node['#'];
    }
    startsWith(prefix) {
        let node = this.root;
        for (const c of prefix) { if (!node[c]) return false; node = node[c]; }
        return true;
    }
}`,
    timeComplexity: 'O(m) per operation',
    spaceComplexity: 'O(m·n)',
    testCases: [],
  },

  // ── Intervals ─────────────────────────────────────────────────────
  'merge-intervals': {
    id: 'merge-intervals',
    lcId: 56,
    title: 'Merge Intervals',
    difficulty: 'Medium',
    track: 'intervals',
    module: 'interval-basics',
    tags: ['Array', 'Sorting'],
    acceptance: 47.4,
    description: `Given an array of intervals where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals.`,
    hints: [
      'Sort intervals by start time.',
      'If current start <= last end: merge (take max end).',
      'Otherwise: add as new interval.',
    ],
    examples: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
    ],
    starterCode: {
      javascript: `var merge = function(intervals) {
    
};`,
      python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        
    }
};`,
    },
    solution: `var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [intervals[0]];
    for (const [s, e] of intervals.slice(1)) {
        if (s <= res[res.length-1][1]) res[res.length-1][1] = Math.max(res[res.length-1][1], e);
        else res.push([s, e]);
    }
    return res;
};`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    testCases: [],
  },

  // ── Math & Bits ────────────────────────────────────────────────────
  'single-number': {
    id: 'single-number',
    lcId: 136,
    title: 'Single Number',
    difficulty: 'Easy',
    track: 'math-bits',
    module: 'bit-basics',
    tags: ['Array', 'Bit Manipulation'],
    acceptance: 71.9,
    description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one. Must run in O(n) time and O(1) space.`,
    hints: [
      'XOR of a number with itself is 0.',
      'XOR of a number with 0 is the number itself.',
      'XOR all elements — pairs cancel out, leaving the single number.',
    ],
    examples: [
      { input: '[2,2,1]', output: '1' },
      { input: '[4,1,2,1,2]', output: '4' },
    ],
    starterCode: {
      javascript: `var singleNumber = function(nums) {
    
};`,
      python: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        
    }
};`,
    },
    solution: `var singleNumber = function(nums) {
    return nums.reduce((xor, n) => xor ^ n, 0);
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[2,2,1]', expected: '1' },
      { input: '[4,1,2,1,2]', expected: '4' },
    ],
  },

  'missing-number': {
    id: 'missing-number',
    lcId: 268,
    title: 'Missing Number',
    difficulty: 'Easy',
    track: 'math-bits',
    module: 'math-problems',
    tags: ['Array', 'Hash Table', 'Math', 'Bit Manipulation', 'Sorting'],
    acceptance: 64.7,
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
    hints: [
      'Expected sum = n*(n+1)/2.',
      'Missing = expectedSum - actualSum.',
    ],
    examples: [
      { input: '[3,0,1]', output: '2' },
      { input: '[9,6,4,2,3,5,7,0,1]', output: '8' },
    ],
    starterCode: {
      javascript: `var missingNumber = function(nums) {
    
};`,
      python: `class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        
    }
};`,
    },
    solution: `var missingNumber = function(nums) {
    const n = nums.length;
    return n * (n + 1) / 2 - nums.reduce((s, x) => s + x, 0);
};`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [],
  },
};

export const getProblemById = (id) => PROBLEMS[id];

export const getAllProblems = () => Object.values(PROBLEMS);

export const getProblemsByTrack = (trackId) =>
  Object.values(PROBLEMS).filter(p => p.track === trackId);

export const getProblemsByModule = (moduleId) =>
  Object.values(PROBLEMS).filter(p => p.module === moduleId);
