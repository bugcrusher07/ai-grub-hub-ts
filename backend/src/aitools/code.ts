import { ResponseObject } from "../common/common";
import { geminiApi } from "../geminiApi";

export interface CodeParams{
  language: string;
  problemDescription: string;
  codeContext: string;
  desiredOutput: string;
  errorMessages: string;
  frameworks: string;
  timeComplexity: string;
  spaceComplexity: string;
  codeStyle: string;
  additionalConstraints: string;
}

export async function generateCode(formData:CodeParams) {
  console.log("generateCodeAdvice is executed");

  const prompt = `Generate comprehensive code advice in JSON format based on the following requirements:

Programming Language: ${formData.language}
Problem Description: ${formData.problemDescription}
Code Context: ${formData.codeContext || 'None'}
Desired Output: ${formData.desiredOutput || 'None'}
Error Messages: ${formData.errorMessages || 'None'}
Frameworks/Libraries: ${formData.frameworks || 'None'}
Time Complexity: ${formData.timeComplexity || 'Not specified'}
Space Complexity: ${formData.spaceComplexity || 'Not specified'}
Code Style: ${formData.codeStyle || 'Standard'}
Additional Constraints: ${formData.additionalConstraints || 'None'}

Output Requirements:
Create a comprehensive code advice response with the following JSON structure:

{
  "title": "JavaScript Code Optimization",
  "summary": "Comprehensive code analysis and optimization for sorting algorithms",
  "metadata": {
    "language": "JavaScript",
    "complexity": {
      "time": "O(n log n)",
      "space": "O(1)"
    },
    "generatedAt": "2024-01-15T10:30:00Z"
  },
  "sections": [
    {
      "title": "Optimized Code",
      "type": "code",
      "content": "// Your optimized code solution here\nfunction optimizedSolution(arr) {\n  // Implementation\n  return arr.sort((a, b) => a - b);\n}"
    },
    {
      "title": "Performance Analysis",
      "type": "analysis",
      "content": {
        "timeComplexity": "O(n log n)",
        "spaceComplexity": "O(1)",
        "improvements": [
          {
            "metric": "Runtime",
            "improvement": "25%",
            "before": "120ms",
            "after": "90ms"
          },
          {
            "metric": "Memory",
            "improvement": "15%",
            "before": "45MB",
            "after": "38MB"
          }
        ]
      }
    },
    {
      "title": "Code Improvements",
      "type": "list",
      "content": [
        "Used more efficient sorting algorithm",
        "Reduced memory allocations",
        "Improved error handling",
        "Added input validation",
        "Optimized loop structures"
      ]
    },
    {
      "title": "Best Practices",
      "type": "practices",
      "content": [
        {
          "title": "Error Handling",
          "description": "Implement comprehensive error handling to make your code robust",
          "code": "try {\n  // Your code here\n} catch (error) {\n  console.error('Error:', error.message);\n  return null;\n}"
        },
        {
          "title": "Input Validation",
          "description": "Always validate inputs to prevent unexpected behavior",
          "code": "if (!input || !Array.isArray(input)) {\n  throw new Error('Invalid input provided');\n}"
        },
        {
          "title": "Code Documentation",
          "description": "Document your functions with clear JSDoc comments",
          "code": "/**\n * Sorts array efficiently\n * @param {Array} arr - Array to sort\n * @returns {Array} Sorted array\n */\nfunction sortArray(arr) {\n  // Implementation\n}"
        }
      ]
    },
    {
      "title": "Alternative Approaches",
      "type": "alternatives",
      "content": [
        {
          "title": "Quick Sort",
          "pros": ["Very fast average case", "In-place sorting", "Widely used"],
          "cons": ["Worst case O(n²)", "Not stable", "Complex implementation"],
          "useCase": "Large datasets where average performance matters"
        },
        {
          "title": "Merge Sort",
          "pros": ["Stable sorting", "Guaranteed O(n log n)", "Good for large datasets"],
          "cons": ["Requires extra space", "More complex than simple sorts", "Overhead for small arrays"],
          "useCase": "When stability is required and memory is available"
        },
        {
          "title": "Built-in Sort",
          "pros": ["Highly optimized", "Less code to write", "Well tested"],
          "cons": ["Less control", "May not fit specific needs", "Browser differences"],
          "useCase": "Standard sorting without special requirements"
        }
      ]
    },
    {
      "title": "Testing Suite",
      "type": "testing",
      "content": "// Comprehensive test suite\nimport { describe, it, expect } from 'vitest';\nimport { optimizedSolution } from './solution.js';\n\ndescribe('OptimizedSolution', () => {\n  it('should handle normal cases', () => {\n    const input = [3, 1, 4, 1, 5];\n    const result = optimizedSolution(input);\n    expect(result).toEqual([1, 1, 3, 4, 5]);\n  });\n\n  it('should handle empty array', () => {\n    const result = optimizedSolution([]);\n    expect(result).toEqual([]);\n  });\n\n  it('should handle single element', () => {\n    const result = optimizedSolution([42]);\n    expect(result).toEqual([42]);\n  });\n\n  it('should handle large datasets', () => {\n    const largeInput = Array(1000).fill(0).map(() => Math.random());\n    const result = optimizedSolution([...largeInput]);\n    expect(result).toHaveLength(1000);\n    expect(result[0]).toBeLessThanOrEqual(result[result.length - 1]);\n  });\n\n  it('should handle invalid input gracefully', () => {\n    expect(() => optimizedSolution(null)).not.toThrow();\n    expect(() => optimizedSolution(undefined)).not.toThrow();\n  });\n});"
    }
  ]
}

Ensure:
1. Generate exactly 6 sections: "Optimized Code", "Performance Analysis", "Code Improvements", "Best Practices", "Alternative Approaches", "Testing Suite"
2. Tailor the code solution to the specific programming language and problem
3. Provide realistic performance improvements and complexity analysis
4. Include 3-5 code improvements in the list
5. Provide 3 best practices with code examples
6. Include 3 alternative approaches with pros/cons
7. Generate comprehensive test cases in the appropriate testing framework for the language
8. Use the current timestamp for generatedAt
9. Return valid, parseable JSON only
10. Make sure all code examples are syntactically correct for the specified language`;

  return await geminiApi(prompt);
}