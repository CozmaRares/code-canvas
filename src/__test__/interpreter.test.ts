import { describe, test, expect } from "vitest";
import { VerticalBlock, setupStore } from "./test-utils";
import Interpreter from "@/lib/interpreter";

const interpreter = new Interpreter();

function testRunner(
  testName: string,
  blocks: Array<VerticalBlock>,
  expected: Record<string, number>,
  shouldError: boolean,
): void {
  test(testName, () => {
    setupStore(blocks);

    let wasError = false;
    interpreter.start(txt => (wasError = wasError || txt.type == "err"));

    if (shouldError) expect(wasError).toBe(true);
    else {
      // eslint-disable-next-line
      // @ts-ignore
      const variables = Object.fromEntries(interpreter.variables.entries());
      expect(variables).toStrictEqual(expected);
    }
  });
}

const tests: Record<
  string,
  Array<[string, Array<VerticalBlock>, Record<string, number>, boolean?]>
> = {
  "variable assignment": [
    [
      "assign int",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [["number", { number: "2" }]],
        },
      ],
      { a: 2 },
    ],
    [
      "assign float",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [["number", { number: "123.4567" }]],
        },
      ],
      { a: 123.457 },
    ],
    [
      "assign to another variable",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [["number", { number: "1" }]],
        },
        {
          type: "variable assign",
          props: { variable: "b" },
          expression: [["variable name", { variable: "a" }]],
        },
      ],
      { a: 1, b: 1 },
    ],
    [
      "operator +",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "+" }],
            ["number", { number: "2" }],
          ],
        },
      ],
      { a: 3 },
    ],
    [
      "operator -",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "-" }],
            ["number", { number: "2" }],
          ],
        },
      ],
      { a: -1 },
    ],
    [
      "operator *",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "2" }],
            ["operator", { operator: "*" }],
            ["number", { number: "10" }],
          ],
        },
      ],
      { a: 20 },
    ],
    [
      "operator /",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "5" }],
            ["operator", { operator: "/" }],
            ["number", { number: "3" }],
          ],
        },
      ],
      { a: 1.667 },
    ],
    [
      "operator //",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "5" }],
            ["operator", { operator: "//" }],
            ["number", { number: "3" }],
          ],
        },
      ],
      { a: 1 },
    ],
    [
      "operator %",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "5" }],
            ["operator", { operator: "%" }],
            ["number", { number: "3" }],
          ],
        },
      ],
      { a: 2 },
    ],
    [
      "operator ^",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "2" }],
            ["operator", { operator: "^" }],
            ["number", { number: "10" }],
          ],
        },
      ],
      { a: 1024 },
    ],
    [
      "operator =, a = b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "=" }],
            ["number", { number: "1" }],
          ],
        },
      ],
      { a: 1 },
    ],
    [
      "operator =, a != b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "=" }],
            ["number", { number: "2" }],
          ],
        },
      ],
      { a: 0 },
    ],
    [
      "operator <>, a != b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "<>" }],
            ["number", { number: "2" }],
          ],
        },
      ],
      { a: 1 },
    ],
    [
      "operator <>, a = b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "<>" }],
            ["number", { number: "1" }],
          ],
        },
      ],
      { a: 0 },
    ],
    [
      "operator >, a > b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "2" }],
            ["operator", { operator: ">" }],
            ["number", { number: "1" }],
          ],
        },
      ],
      { a: 1 },
    ],
    [
      "operator >, a < b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: ">" }],
            ["number", { number: "2" }],
          ],
        },
      ],
      { a: 0 },
    ],
    [
      "operator <, a < b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "<" }],
            ["number", { number: "2" }],
          ],
        },
      ],
      { a: 1 },
    ],
    [
      "operator <, a = b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "<" }],
            ["number", { number: "1" }],
          ],
        },
      ],
      { a: 0 },
    ],
    [
      "operator >=, a > b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "2" }],
            ["operator", { operator: ">=" }],
            ["number", { number: "1" }],
          ],
        },
      ],
      { a: 1 },
    ],
    [
      "operator >=, a < b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: ">=" }],
            ["number", { number: "2" }],
          ],
        },
      ],
      { a: 0 },
    ],
    [
      "operator <=, a = b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "1" }],
            ["operator", { operator: "<=" }],
            ["number", { number: "1" }],
          ],
        },
      ],
      { a: 1 },
    ],
    [
      "operator <=, a > b",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["number", { number: "2" }],
            ["operator", { operator: "<=" }],
            ["number", { number: "1" }],
          ],
        },
      ],
      { a: 0 },
    ],
    [
      "malformed expression",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [
            ["operator", { operator: "<=" }],
            ["number", { number: "1" }],
          ],
        },
      ],
      {},
      true,
    ],
  ],
  "if statement": [
    [
      "if with variable non 0",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [["number", { number: "1" }]],
        },
        {
          type: "if",
          props: {},
          expression: [["variable name", { variable: "a" }]],
          statements: [
            {
              type: "variable assign",
              props: { variable: "a" },
              expression: [["number", { number: "2" }]],
            },
          ],
        },
      ],
      { a: 2 },
    ],
    [
      "if with variable 0",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [["number", { number: "0" }]],
        },
        {
          type: "if",
          props: {},
          expression: [["variable name", { variable: "a" }]],
          statements: [
            {
              type: "variable assign",
              props: { variable: "a" },
              expression: [["number", { number: "2" }]],
            },
          ],
        },
      ],
      { a: 0 },
    ],
    [
      "if with variable not defined",
      [
        {
          type: "if",
          props: {},
          expression: [["variable name", { variable: "a" }]],
          statements: [
            {
              type: "variable assign",
              props: { variable: "a" },
              expression: [["number", { number: "2" }]],
            },
          ],
        },
      ],
      {},
      true,
    ],
  ],
  "while statement": [
    [
      "compute 1+2+...+10",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [["number", { number: "10" }]],
        },
        {
          type: "variable assign",
          props: { variable: "b" },
          expression: [["number", { number: "0" }]],
        },
        {
          type: "while",
          props: {},
          expression: [["variable name", { variable: "a" }]],
          statements: [
            {
              type: "variable assign",
              props: { variable: "b" },
              expression: [
                ["variable name", { variable: "b" }],
                ["operator", { operator: "+" }],
                ["variable name", { variable: "a" }],
              ],
            },
            {
              type: "variable assign",
              props: { variable: "a" },
              expression: [
                ["variable name", { variable: "a" }],
                ["operator", { operator: "-" }],
                ["number", { number: "1" }],
              ],
            },
          ],
        },
      ],
      { a: 0, b: 55 },
    ],
    [
      "while with variable 0",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [["number", { number: "0" }]],
        },
        {
          type: "while",
          props: {},
          expression: [["variable name", { variable: "a" }]],
          statements: [
            {
              type: "variable assign",
              props: { variable: "b" },
              expression: [["number", { number: "10" }]],
            },
          ],
        },
      ],
      { a: 0 },
    ],
    [
      "while with variable not defined",
      [
        {
          type: "while",
          props: {},
          expression: [["variable name", { variable: "a" }]],
          statements: [
            {
              type: "variable assign",
              props: { variable: "a" },
              expression: [["number", { number: "2" }]],
            },
          ],
        },
      ],
      {},
      true,
    ],
  ],
  "regular programs": [
    [
      "verify if prime",
      [
        {
          type: "variable assign",
          props: { variable: "a" },
          expression: [["number", { number: "3" }]],
        },
        {
          type: "variable assign",
          props: { variable: "it" },
          expression: [["number", { number: "2" }]],
        },
        {
          type: "variable assign",
          props: { variable: "cond" },
          expression: [
            ["variable name", { variable: "it" }],
            ["operator", { operator: "*" }],
            ["variable name", { variable: "it" }],
          ],
        },
        {
          type: "variable assign",
          props: { variable: "cond" },
          expression: [
            ["variable name", { variable: "cond" }],
            ["operator", { operator: "<=" }],
            ["variable name", { variable: "a" }],
          ],
        },
        {
          type: "variable assign",
          props: { variable: "isPrime" },
          expression: [["number", { number: "1" }]],
        },
        {
          type: "while",
          props: {},
          expression: [["variable name", { variable: "cond" }]],
          statements: [
            {
              type: "variable assign",
              props: { variable: "r" },
              expression: [
                ["variable name", { variable: "a" }],
                ["operator", { operator: "%" }],
                ["variable name", { variable: "it" }],
              ],
            },
            {
              type: "variable assign",
              props: { variable: "cond" },
              expression: [
                ["variable name", { variable: "r" }],
                ["operator", { operator: "=" }],
                ["variable name", { variable: "0" }],
              ],
            },
            {
              type: "if",
              props: {},
              expression: [["variable name", { variable: "cond" }]],
              statements: [
                {
                  type: "variable assign",
                  props: { variable: "isPrime" },
                  expression: [["number", { number: "0" }]],
                },
              ],
            },
            {
              type: "variable assign",
              props: { variable: "it" },
              expression: [
                ["variable name", { variable: "it" }],
                ["operator", { operator: "+" }],
                ["variable name", { variable: "1" }],
              ],
            },
            {
              type: "variable assign",
              props: { variable: "cond" },
              expression: [
                ["variable name", { variable: "it" }],
                ["operator", { operator: "*" }],
                ["variable name", { variable: "it" }],
              ],
            },
            {
              type: "variable assign",
              props: { variable: "cond" },
              expression: [
                ["variable name", { variable: "cond" }],
                ["operator", { operator: "<=" }],
                ["variable name", { variable: "a" }],
              ],
            },
            {
              type: "variable assign",
              props: { variable: "cond" },
              expression: [
                ["variable name", { variable: "cond" }],
                ["operator", { operator: "*" }],
                ["variable name", { variable: "isPrime" }],
              ],
            },
          ],
        },
        {
          type: "print",
          props: {},
          expression: [["variable name", { variable: "isPrime" }]],
        },
      ],
      { a: 3, isPrime: 1, it: 2, cond: 0 },
    ],
  ],
};

Object.entries(tests).forEach(([key, testGroup]) =>
  describe(key, () =>
    testGroup.forEach(([name, blocks, expected, shouldError]) =>
      testRunner(name, blocks, expected, shouldError ?? false),
    ),
  ),
);
