import { test, expect } from "vitest";
import { VerticalBlock, setupStore } from "./test-utils";
import PythonConverter from "@/lib/python-converter";

function testRunner(
  testName: string,
  blocks: Array<VerticalBlock>,
  expected: Array<string>,
): void {
  test(testName, () => {
    setupStore(blocks);
    expect(PythonConverter.program()).toStrictEqual(expected);
  });
}

const tests: Array<[string, Array<VerticalBlock>, Array<string>]> = [
  [
    "assign int",
    [
      {
        type: "variable assign",
        props: { variable: "a" },
        expression: [["number", { number: "2" }]],
      },
    ],
    ["a = round(2, 3)"],
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
    ["a = round(123.4567, 3)"],
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
    ["a = round(1, 3)", "b = round(a, 3)"],
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
    ["a = round(1 + 2, 3)"],
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
    ["a = round(1 - 2, 3)"],
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
    ["a = round(2 * 10, 3)"],
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
    ["a = round(5 / 3, 3)"],
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
    ["a = round(5 // 3, 3)"],
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
    ["a = round(5 % 3, 3)"],
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
    ["a = round(2 ** 10, 3)"],
  ],
  [
    "operator =",
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
    ["a = round(1 == 1, 3)"],
  ],
  [
    "operator <>",
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
    ["a = round(1 != 2, 3)"],
  ],
  [
    "operator >",
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
    ["a = round(2 > 1, 3)"],
  ],
  [
    "operator <",
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
    ["a = round(1 < 2, 3)"],
  ],
  [
    "operator >=",
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
    ["a = round(2 >= 1, 3)"],
  ],
  [
    "operator <=",
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
    ["a = round(1 <= 1, 3)"],
  ],
  [
    "if statement",
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
    ["if a != 0 :", "    a = round(2, 3)"],
  ],
  [
    "while",
    [
      {
        type: "while",
        props: {},
        expression: [["variable name", { variable: "a" }]],
        statements: [
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
    ["while a != 0 :", "    a = round(a - 1, 3)"],
  ],
  [
    "print statement ",
    [
      {
        type: "print",
        props: {},
        expression: [["variable name", { variable: "a" }]],
      },
    ],
    [`print("Value of 'a' is", a)`],
  ],
  [
    "verify if number is prime",
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
    `a = round(3, 3)
it = round(2, 3)
cond = round(it * it, 3)
cond = round(cond <= a, 3)
isPrime = round(1, 3)
while cond != 0 :
    r = round(a % it, 3)
    cond = round(r == 0, 3)
    if cond != 0 :
        isPrime = round(0, 3)
    it = round(it + 1, 3)
    cond = round(it * it, 3)
    cond = round(cond <= a, 3)
    cond = round(cond * isPrime, 3)
print("Value of 'isPrime' is", isPrime)`.split("\n"),
  ],
];

tests.forEach(([name, blocks, expected]) => testRunner(name, blocks, expected));
