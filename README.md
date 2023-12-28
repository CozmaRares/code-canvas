# Code Canvas

> [Working Demo](https://code-canvas.raru.dev/)

## Table of Contents

## 1. Introduction

Welcome to **Code Canvas**, a project included in the SCS (Structure of Computer
Systems) course curriculum. **Code Canvas** aims to provide a visual coding environment
for learners. This documentation serves as a comprehensive guide to understanding,
setting up, and utilizing this product.

### 1.1. Context

In the constantly evolving landscape of programming, visual coding environments
have been gaining increasing popularity. As technology becomes more intertwined
with our lives, the need for accessible programming tools has become more
pronounced. Visual editing environments, with their graphical interfaces and
interactive components, have greatly lowered the barrier of entry to the field
of programming.

Platforms like `Scratch` and `Blockly` provide a thoughtful abstraction of classic
programming concepts. These environments offer an alternative to traditional
text-based coding, providing a more intuitive approach to programming concepts.
The graphical representation of code structures and the drag-and-drop
functionality make it easier for beginners to grasp fundamental programming
concepts without the immediate need to memorize syntax. This evolution aligns
with the broader trend observed in contemporary design and development tools.
Great examples of such tools would be `Web Flow`, `Framer`, and `Figma`, which
exemplify how visual editors have become a part of the workflows of professionals.

The context in with which **Code Canvas** alligns is characterized by an understanding
that programming should be a skill accessible to all.

### 1.2. Motivation

The motivation behind the **Code Canvas** project is rooted the recreation of
`Blockly` with a handful features. While `Blockly` has made more significant
strides in simplifying programming concepts, **Code Canvas** seeks to refine
this approach further by offering a focused subset of features.

The decision to recreate `Blocky` with a smaller set of features is driven by a
commitment to providing a more approachable entry point into programming for users.
By including the essential components of programming languages, including if
statements, while loops, variables, and print statements, **Code Canvas** aims
to create an environment that facilitates understanding programming concepts.
This intentional simplification addresses the unique needs of beginners, allowing
them to build a solid foundation before delving into more advanced programming constructs.

### 1.3. Objectives

1. **Streamlined Recreation of Blockly:**

   - _Description:_ **Code Canvas** aims to recreate the simplicity of `Blockly`
     with a refined and focused set of features.

2. **Accessible Programming Education:**

   - _Description:_ The primary objective is to provide an accessible programming
     environment that aligns with the understanding that programming should be a
     skill accessible to all.

3. **Foundational Understanding of Programming Concepts:**
   - _Description:_ **Code Canvas** seeks to facilitate a foundational understanding
     of programming concepts by intentionally simplifying the learning process.
     The inclusion of essential components such as if statements, loops, variables,
     and print statements aims to build a solid foundation for beginners.

## 2. Bibliographic Study

In the development of **Code Canvas**, the selection of technologies and tools
dictated the architecture and functionality of the visual coding environment.

### 2.1. Programming Languages and Frameworks

#### 2.1.1. TypeScript

`TypeScript`, a superset of _JavaScript_, was chosen as the primary programming
language. Its static typing apabilities provide enhanced code quality and
improved developer productivity. The strong type-checking helps catch errors
during development, ensuring a robust and maintainable codebase.

#### 2.1.2. React

The project leverages `React`, a widely adopted _JavaScript_ library for building
user interfaces. `React`'s component-based architecture allows for the creation of
modular and reusable UI elements, facilitating the development of a dynamic
and responsive visual coding environment.

### 2.2. Styling

#### 2.2.1. TailwindCSS

`TailwindCSS` was employed for styling in **Code Canvas**. Its utility-first
approach and flexibility allowed for rapid styling and a consistent design
language throughout the application.

#### 2.2.2. shadcn/ui

The `shadcn/ui` component library played a crucial role in enhancing the user
interface of **Code Canvas**. Leveraging pre-built components from this library
not only sped-up development but also contributed to a cohesive and aesthetically
pleasing design.

### 2.3. Tools

#### 2.3.1. Vite

`Vite` was chosen as the build tool. Its speed and efficiency in module
bundling, coupled with features like hot module replacement (HMR), significantly
expedited the development workflow. Vite's seamless integration with `TypeScript`
and `React` contributed to a smooth and optimized development experience.

#### 2.3.2. ESLint

`ESLint` is employed for static code analysis in **Code Canvas**. Its configurable
rules and automatic code fixing contribute to identifying potential issues early
in the development process.

#### 2.3.3. Prettier

`Prettier` is utilized for code formatting. Its opinionated approach to code
styling ensures a standardized and visually appealing codebase.

#### 2.3.4. Vitest

`Vitest` is utilized for unit testing. Its simplicity and integration with the
`Vite` ecosystem make it a suitable choice for validating the functionality of
individual units of code.

## 3. Design & Analysis

### 3.1. System Architecture

The architecture of **Code Canvas** has been designed to not only sustain the
existing codebase but also to facilitate the addition of novel features. This
approach ensures extensible foundation for the project's evolution. The file
structure has been organized to enhance clarity and maintainability, consisting
of the following key components:

- **Components Directory:**

  - This directory encompasses all aspects related to the user interface. It is
    further subdivided into:
    - **Primary Components:** The primary building blocks utilized by the user
      interface, each serving a distinct role in the overall design and functionality.
    - **"_Blocks_" Subdirectory:** This directory is specifically designed to
      encapsulate components essential for rendering individual code blocks. This
      separation promotes modularity and ease of maintenance.

- **Context Directory:**

  - Contained within this directory is the logic associated with the _React
    Context_ API. It serves as a centralized hub for managing and propagating
    state throughout the application, ensuring a central location for defining the
    data flow.

- **Lib Directory:**
  - This directory houses critical business logic that forms the backbone of
    **Code Canvas**. Included components are:
    - **Interpreter:** This component is responsible for executing and
      interpreting the created tree of code blocks.
    - **Python Converter:** It facilitates the conversion of code representations
      to Python syntax.
    - **State Manager:** This component manages the state of the application,
      contributing to a dynamic and responsive user experience.
    - **Block Definitions:** This component hosts the foundational definitions
      for each node in the syntax tree, a key component of the in-memory
      representation of created code blocks.

### 3.2. User Interface Design

At its core, the interface contains a visually pleasing canvas where users can
drag and drop code blocks to construct programs. The canvas dynamically renders
the visual representation of code structures in real-time, providing immediate
feedback as users interact with the intuitive components. A minimal set of code
blocks, encompassing if statements, loops, variables, and print statements, forms
the foundation of the visual coding environment. The user interface also integrates
elements from the `shadcn/ui` library, ensuring a cohesive and aesthetically
pleasing design. Throughout the interface, visual cues, user prompts, and
drag-and-drop functionality work in harmony, empowering users to effortlessly
experiment with programming concepts.

Visual Elements:

- Color Palette:
  - Adopting a thoughtfully curated theme from the `shadcn/ui` library, the light
    mode features a slightly blue-tinged white background. In contrast, the dark
    mode introduces a subtly blue-tinted gray background, providing an overall
    visually comfortable environment.
  - The code blocks exhibit a carefully chosen blend of hues to easily
    distinguish between different programming constructs. For vertical code blocks,
    shades of purple and pink were selected, offering a vibrant visual representation.
    Horizontal code blocks, on the other hand, showcase shades of blue and green,
    creating a complementary palette. Importantly, these colors are dynamically
    adjusted to align with the chosen theme: lighter shades harmonize with the light
    mode, while darker tones provide a distinctive look in dark mode.
- Typography:
  - In the **Code Canvas** web app, simplicity is maintained in the typography.
    The default font remains unchanged for most parts of the application to achieve
    a straightforward appearance. However, exceptions exist in the form of input
    fields and the console component, where a monospace font is utilized. This
    adjustment is made to enhance the readability of text in these specific areas
    when code is being input or console outputs are being reviewed.

### 3.3. User Workflow

Navigating through the Code Canvas web application is designed to be intuitive
and user-friendly. The steps illustrate a typical user workflow within the application:

1. **Initialization:**

   - Users start by accessing the Code Canvas web application, where they are
     presented with the visual coding environment.

2. **Dragging and Dropping Code Blocks:**

   - The core interaction involves users dragging and dropping code blocks onto
     the canvas, with each code block representing a specific programming construct.

3. **Constructing Programs:**

   - Users construct programs by arranging and connecting code blocks on the canvas.
     The visual representation allows for a clear understanding of the program's
     structure.

4. **Configuring Code Blocks:**

   - Users can configure individual code blocks by interacting with them. This
     includes setting conditions, defining loop iterations, and assigning values
     to variables.

5. **Real-Time Rendering:**

   - As users manipulate code blocks, the visual canvas dynamically renders the
     code structures in real-time. This instant feedback allows users to visualize
     the evolving program.

6. **Testing the Code:**

   - Users can execute and test their programs within the environment. The console
     component provides real-time feedback, displaying the syntactically equivalent
     Python code along with the output and potential errors.

7. **Exporting Projects:**
   - Users have the option to convert their code to Python and download the file
     locally.

By following this user workflow, individuals can easily navigate the environment,
experiment with programming concepts, and create visually expressive code structures
in an accessible and engaging manner.

## 4. Implementation

### 4.1. Structure of the Web Application

**Code Canvas** is architecturally organized into four main components: the _Header_,
_Sidebar_, _Editor Area_, and _Console_. Each component plays a distinct role in
the workflow of an user.

#### 4.1.1. Header Component

The _Header_ serves as the top section of the application, featuring
essential navigation and functionality controls:

- **The Logo** is a visual representation of the Code Canvas brand, providing a
  recognizable visual identity.
- **Buttons**:
  - **Open/Close Console:**
    - Allows users to toggle the visibility of the Console component, providing
      flexibility in managing the available visible space.
  - **Run Code:**
    - Initiates the execution of the visual code created in the Editor Area,
      triggering the display of the Console component.
  - **Download Code:**
    - Enables users to download the generated Python code, allowing for external
      use or further development.
  - **Theme Switch:**
    - Facilitates the toggling between light and dark themes, catering to user
      preferences and varying lighting conditions.

#### 4.1.2. Sidebar Component

The _Sidebar_, positioned along the left side of the application,
serves as a repository for the draggable code blocks:

- **Variable Assignment:**
  - Represents the code block for assigning values to variables.
- **If Statement:**
  - Provides a code block for implementing conditional statements.
- **While Loop:**
  - Contains the code block for creating iterative while loops.
- **Print Statement:**
  - Represents the code block for displaying output in the console.
- **Variable Access:**
  - Enables users to reference and use variables within the visual code.
- **Operator Block:**
  - Contains code blocks representing various operators for building expressions.
- **Number Block:**
  - Represents a code block for numerical values within the visual code.

Users can drag these blocks from the Sidebar and drop them into the Editor
Area for seamless code construction.

#### 4.1.3. Editor Area

Users can interact with the _Editor Area_ by dragging code blocks from the _Sidebar_
and dropping them onto the canvas, allowing for the creation of visually
expressive program.

#### 4.1.4. Console Component

The **Console** component serves as the output and feedback interface, providing
information on the execution of the visual code.

After running the program, the Console maximizes itself to display the syntactically
equivalent Python code and the output, or any potential errors.

Assuming there are no errors, each line in the console is prefixed with a **'>'**
or **'<'**. A **'>'** denotes an input line, reflecting what the programmer would
have typed, while **'<'** signifies an output line, representing the outcome of
the print statements.

### 4.2. Code Blocks

#### 4.2.1. Visual Code Syntax

##### 4.2.1.1. Horizontal Blocks

Horizontal blocks constitute the expressions within code structures:

- **Variable Access Block:**
  - _Purpose:_ Represents the access of a variable.
  - _Input Field:_ Accepts characters forming a valid identifier.
- **Operator Block:**

  - _Purpose:_ Represents various operators for building expressions.
  - _Input Field:_ Accepts one of the supported operators.

- **Number Block:**
  - _Purpose:_ Represents numerical values.
  - _Input Field:_ Accepts positive or negative numbers.

These blocks are typically arranged side by side to form expressions within code,
akin to traditional mathematical expressions. They contribute to the logical
flow and calculation aspects of the code.

##### 4.2.1.2. Vertical Blocks

Vertical blocks, on the other hand, are employed for higher-level code structures
and control flow:

- **Variable Assignment Block:**

  - _Purpose:_ Represents the assignment of values to variables.
  - _Expression:_ Accepts a combination of up to 1 or 3 horizontal blocks,
    including variable access, operators, and numbers.

- **If Statement Block:**

  - _Purpose:_ Implements conditional statements.
  - _Expression:_ Accepts only 1 variable access block.
  - _Child Statements:_ Allows the inclusion of other vertical blocks as child statements.

- **While Statement Block:**

  - _Purpose:_ Functions similarly to an if statement.
  - _Expression:_ Accepts only 1 variable access block.
  - _Child Statements:_ Permits the inclusion of other vertical blocks as child statements.

- **Print Statement Block:**
  - _Purpose:_ Displays output in the console.
  - _Expression:_ Accepts only 1 variable access block.

Vertical blocks provide the overarching structure of the code, facilitating the
representation of control flow and logical conditions. The combination of horizontal
and vertical blocks offers users a versatile and intuitive environment for visually
constructing their code.

#### 4.2.1. Model Definition

The definition of each code block begins with a 'model', represented as a node
in the syntax tree of the program. The 'GenericCodeBlockModel' interface, along
with its extensions, outlines essential attributes such as a unique identifier
('id'), a type identifier ('type'), and properties ('props') specific to each
block. Additionally, some blocks may include an 'expression list' or 'statements
list' to enhance their functionality.

```typescript
export interface GenericCodeBlockModel<T> {
  id: string;
  type: string;
  props: T;
}

export interface GenericCodeBlockModelWithExpression<T>
  extends GenericCodeBlockModel<T> {
  expressionList: Array<HorizontalBlockInfo>;
  maxExpressionLength: number;
  expressionAccpetedTypes: Readonly<HorizontalBlockType[]>;
}

export interface GenericCodeBlockModelWithStatements<T>
  extends GenericCodeBlockModelWithExpression<T> {
  statements: Array<VerticalBlockInfo>;
}
```

#### 4.2.2. The 'CodeBlock' component

The `CodeBlock` component dictates the structure of each code block, acting as a
wrapper for child nodes and featuring a delete button for user interaction. This
structure is modular and consistent across all code blocks, simplifying the
addition of new blocks and ensuring a consistent structures of each code block.

Here is an example of how it is used:

```typescript
// in 'CodeBlock.tsx'
const CodeBlock = (props) => {
  return (
    <div>
      {props.children}
      <button
        onClick={() => store.deleteBlock(id, true)}
      >
        X
      </button>
    </div>
  );
};

// in 'NumberBlock.tsx'
const NumberBlock = (props) => {
  return (
    <CodeBlock>
        <input />
    </CodeBlock>
  );
};
```

> **Note** For the implementation details, look into the files.

#### 4.2.3. The Preview Component

Every draggable code block in the _Sidebar_ serves as a preview component. These
components resemble puzzle pieces, providing a visual representation of their
orientation. Additionally, they include text crucial for distinguishing between
different types of blocks.

#### 4.2.4. The 'codeBlocks' object

All code blocks are organized within the `codeBlocks` object in the 'lib/code-block.tsx'
file. This object plays a crucial role in managing the various types of code
blocks and incorporates essential information for each block, including the
React component, preview properties, model, and orientation. The keys of the
object are uniquely defined strings chosen by the developer, representing the
type of each block.

```typescript
type CodeBlockRecord = Record<
  string,
  {
    block: CodeBlockComponent;
    previewProps: Omit<CodeBlockPreviewProps, "orientation">;
    model: Model;
    orientation: BlockOrientation;
  }
>;
```

#### 4.2.5. Extending the Syntax

To introduce a new code block, several modifications are required:

1. Define a new model file in the `lib/models` directory describing the new block.

   ```typescript
   export const newBlockType = "new block" as const;

   type NewBlockProps = Record<string, any>;

   export class NewBlockModel implements GenericCodeBlockModel<NewBlockProps> {
     id: string;
     type = newBlockType;
     props: NewBlockProps;

     constructor(id: string) {
       this.id = id;
       this.props = {};
     }
   }
   ```

2. Create a new UI component in the `components/blocks` directory for the new block.

   ```typescript
   const NewBlock: CodeBlockComponent = ({ id }) => {
     return (
       <CodeBlock
         id={id}
       >
         New Block
       </CodeBlock>
     );
   };
   ```

   > **Note**: there are helper components such as _BlockInput_, ExpressionList*,
   > and \_StatementList* defined in the 'components/blocks/utils' dir

3. Optionally, add new colors in the `components/blocks/utils/colors.tsx` file.

   ```typescript
   export const newBlockColor = makeColor("#ffffff", "#000000");
   ```

   > **Note**: if the color is not defined, it defaults to _pink_ for light mode
   > and _indigo_ for dark mode.

4. Define the syntactically equivalent Python code for the new block.

   ```typescript
   class Interpreter {
     static statementName(model: NewBlockModel, indent = 0): string[] {
       return " ''' new python statment ''' ";
     }
   }
   ```

5. Implement the logic needed to interpret the new block within the `Interpreter`
   class.

   ```typescript
     private handleStatement(id: string, firstLevel: boolean): string {
       const model = store.getModel(id) as NewBlockModel;

       ...

       if(error)
         return "Error: an error occured";

       if (firstLevel)
         this.addConsoleText({
           type: "in",
           text: PythonConverter.newStatement(model),
         });

       // empty string means no error
       return "";
     }
   ```

### 4.4. Business Logic

#### 4.4.1. State Manager

##### 4.4.1.1. Custom Store Implementation

After careful evaluation, a decision was made to implement a custom state management
solution using a class named `Store`. This custom class serves as a dedicated
container for the state related to code blocks, offering the necessary flexibility
without introducing excessive complexity.

The key considerations that led to this decision were:

1. **Mutable State Requirement:**

   - The core requirement for mutable state led to the exploration of alternatives
     beyond React's built-in state management solutions. The need for a custom solution
     emerged to fulfill the specific requirements of **Code Canvas**.

2. **Simplicity vs. Complexity:**
   - While existing state managers were considered, their integration introduced
     additional complexities that were deemed unnecessary for the project's scope.
     The aim was to strike a balance between simplicity and functionality.

##### 4.4.1.2. Accessibility Across Components

To ensure access to the state management capabilities, a `store` object is
instantiated and made available to all components of the application. This
global access facilitates efficient communication between different parts of the
application, enabling components to interact with the 'store' object to retrieve
or modify the state related to code blocks.

##### 4.4.1.3. The Store Class

The 'Store' class encapsulates the state management logic for code blocks within
**Code Canvas**. It exposes well-defined methods that facilitate changes to the
state, ensuring a clean and maintainable codebase.

```typescript
class Store {
  // used to store all the created blocks
  blockMap: Map<string, ConcreteModel> = new Map();

  // used to store link back the child block with its parent
  // an example would be the following
  // child: variable access block
  // parent: print block
  blockBackLinks: Map<string, string> = new Map();

  // a list of the statements present in the editor area
  blocks: VerticalBlockInfo[] = [];

  // function that is colled to force React to rerender the page
  rerender: () => void = () => {};

  addBlock(type: VerticalBlockType, index?: number): void {}

  tryToAddBlock(type: CodeBlockType, index?: number): boolean {}

  indexOf(id: string): number {}

  setProps(id: string, props: Record<string, unknown>): void {}

  getModel(id: string): ConcreteModel {}

  addToExpression(
    parentModel: GenericCodeBlockModelWithExpression<unknown>,
    type: HorizontalBlockType,
  ): void {}

  tryToAddToExpression(parentID: string, type: CodeBlockType): boolean {}

  addStatement(parentID: string, type: VerticalBlockType): void {}

  tryToAddStatement(parentID: string, type: CodeBlockType): boolean {}

  deleteBlock(id: string, firstLevel = false): void {}
}

// instantiate the state manager
const store = new Store();

// make it available to all components
export default store;
```

##### 4.4.1.4. Benefits of Custom Store

1. **Flexibility:**

   - The custom `Store` class provides the required flexibility for managing
     mutable state specific to code blocks without unnecessary constraints.

2. **Maintainability:**

   - The simplicity of the custom solution contributes to a maintainable codebase,
     reducing the likelihood of introducing errors and easing future updates.

3. **Tailored Functionality:**
   - The `Store` class is designed to cater specifically to the needs of **Code Canvas**,
     offering tailored functionality for efficient state management.

#### 4.4.2. Interpreter

The heart of **Code Canvas** lies in its interpreter, a crucial component
responsible for executing the user-created visual code. The `Interpreter` class,
brings the code to life by translating it into syntactically equivalent Python
code.

##### 4.4.2.1. Interpretation Logic

The `Interpreter` class is designed to traverse the syntax tree of the visual code,
handling each code block based on its type and properties. As it navigates through
the tree, it constructs the corresponding Python code representation, capturing
the logic and structure defined by the user within the visual environment.

##### 4.4.2.2. Execution and Console Output

As the interpreter traverses the syntax tree, it dynamically interprets and
executes the code. This execution process allows for the real-time evaluation of
the user's visual code. Subsequently, the console component promptly displays the
output, presenting the syntactically equivalent Python code, along with any
program outputs or potential errors. This immediate feedback mechanism significantly
enriches the user experience, providing instant insights into the interpreted
execution of their visual code during the traversal of the syntax tree.

##### 4.4.2.3. Integration with the 'Store'

The `Interpreter` class is tightly integrated with the `store`, allowing it to
access and modify the state related to code blocks. This seamless interaction
ensures that the interpreter operates on the latest state, reflecting any changes
made by the user during the coding process.

##### 4.4.2.4. Error Handling

To enhance the robustness of the interpreter, error are handled gracefully. The
`Interpreter` class identifies and communicates errors, providing clear and
informative messages to the user through the console. This proactive approach
aids users in identifying and addressing issues within their code, contributing
to a smoother coding experience.

#### 4.4.3. Python Converter

The `Python Converter` class within **Code Canvas** serves as a link between the
visual and textual representations of code. Its structured methods handle the
conversion of user-created visual code, represented as a syntax tree, into
syntactically equivalent Python snippets. One key aspect is the `statements`
method, adept at generating Python code for vertical blocks like conditionals
and loops, ensuring proper indentation and structure. The `program` method
orchestrates the overall conversion process, providing a cohesive representation
of the entire Python program.

```typescript
export default class PythonConverter {
  private static statements(
    statements: VerticalBlockInfo[],
    indent = 0,
  ): string[] {}

  static program(): string[] {}

  static number(model: NumberBlockModel): string {}

  static variableName(model: VariableNameBlockModel): string {}

  static operator(model: OperatorBlockModel): string {}

  static assignment(model: VariableAssignBlockModel, indent = 0): string[] {}

  static if(model: IfBlockModel, indent = 0): string[] {}

  static while(model: WhileBlockModel, indent = 0): string[] {}

  static print(model: PrintBlockModel, indent = 0): string[] {}
}
```

### 4.5. Drag and Drop Functionality

Drag and drop functionality is a fundamental feature in **Code Canvas**, enabling
users to interact with the visual coding environment. Leveraging the power of the
`DnD Kit` library, this section explores the implementation and features that
enhance the user's ability to seamlessly manipulate and organize code blocks
within the canvas.

#### 4.5.1. DnD Kit Library

`DnD Kit` is a versatile and lightweight _JavaScript_ library specifically designed
for building drag-and-drop interfaces. Its simplicity and efficiency make it an
ideal choice for **Code Canvas**, providing a smooth and responsive experience
for users engaging with the visual coding elements.

Key Features of DnD Kit:

- **Draggable Components:**
  - `DnD Kit` allows code blocks to be designated as draggable elements, enabling
    users to initiate drag operations effortlessly.
- **Drop Zones:**
  - The library facilitates the creation of drop zones within the canvas, where
    users can release the dragged code blocks. This feature ensures precise
    placement and organization of code elements.

#### 4.5.2. Implementation in Code Canvas

The integration of `DnD Kit` into **Code Canvas** brings forth an intuitive and
dynamic drag-and-drop experience for users. The implementation is structured to
address specific aspects of the visual coding environment.

##### 4.5.2.1. Draggable Code Blocks

Each code block is configured as a draggable component, allowing users to initiate
drag operations by interacting with designated drag handles.

##### 4.5.2.2. Drop Zones

The _Editor Area_ serves as a designated drop zone, allowing
users to release code blocks.

To enhance the drag-and-drop interactions within the _Editor Area_, `DnD Kit`
introduces a robust collision detection algorithm. The library intelligently
detects the spatial relationships between code blocks and the drop zones. This
ensures that code blocks are accurately dropped within the _Editor Area_.

Moreover, each code block in the editor is equipped with additional drop zones,
positioned at the top and bottom. These additional zones empower users to
seamlessly add new blocks either above or below an existing one, contributing to
a flexible and dynamic coding experience.

### 4.7. User Feedback

User feedback in **Code Canvas** is facilitated through the toast system provided
by `shadcn/ui`. This dedicated system ensures that users receive timely and clear
notifications, especially when errors occur during application usage. The toast
notifications serve as succinct messages, specifically addressing user-related
issues, such as erroneously dropping blocks, e.g., variable access, operators,
or numbers in the editor area.

### 4.8. Accessibility

The application supports keyboard navigation, allowing users to guide the draggable
items, using arrow keys, to their intended drop area. Additionally, tab navigation
is optimized to enhance the overall accessibility of the platform.

## 5. Getting started

### 5.1. Prerequisites

- nodejs

  Debian/Ubuntu:

  ```sh
  sudo apt install nodejs
  ```

- npm

  Debian/Ubuntu:

  ```sh
  sudo apt install npm
  ```

### 5.2. Installation

1. Clone the repo

   ```sh
   git clone https://github.com/CozmaRares/code-canvas.git
   cd code-canvas
   ```

2. Install the dependencies

   ```sh
   npm install
   ```

3. Start the development server

   ```sh
   npm run dev
   ```

4. Run the test suite

   ```sh
   npm run test
   ```

5. Build for production

   ```sh
   npm run build
   ```

## 6. Testing

### 6.1. Units Tested

1. **Interpreter and Python Converter:**
   - _Rationale:_ Given their pivotal roles, the `Interpreter` and `PythonConverter`
     were subjected to meticulous unit testing. These tests aimed to verify their
     individual functionalities and ensure accurate code execution and conversion.
2. **State Manager Integration:**
   - _Consideration:_ The State Manager, tightly integrated with the UI, posed a
     unique challenge for testing in isolation.
   - _Decision:_ It was deemed unnecessary to conduct independent tests for the
     State Manager, as its functionality is inherently linked with the `Interpreter`
     and `PythonConverter`. Any issues with the State Manager would inevitably impact
     the overall system.

### 6.2. Testing Challenges

1. **User Input Replication:**
   - _Challenge:_ Replicating user input proved challenging, particularly due to
     the intricate coupling of the State Manager with the UI. Creating relevant input
     proved to be difficult, as it heavily relies on user actions within the UI.
     To combat this, a significant amount of TypeScript type magic was employed.
2. **Adding New Code Blocks:**
   - _Challenge:_ The mechanism of adding new code blocks complicated the testing
     scenario. To overcome this, a dedicated testing structure was crafted from scratch
     to simulate the process of adding code blocks and ensure the system's responsiveness.

### 6.3. Testing Methodology

#### 6.3.1. Interpreter

1. **Variable Assignment:**
   - **Tests:**
     - Assign Integer
     - Assign Float
     - Assign to Another Variable
     - Operator Addition
     - Operator Subtraction
     - Operator Multiplication
     - Operator Division
     - Operator Integer Division
     - Operator Modulus
     - Operator Exponentiation
     - Operator Equals (a = b)
     - Operator Equals (a != b)
     - Operator Not Equals (a != b)
     - Operator Not Equals (a = b)
     - Operator Greater Than (a > b)
     - Operator Greater Than (a < b)
     - Operator Less Than (a < b)
     - Operator Less Than (a = b)
     - Operator Greater Than or Equal (a > b)
     - Operator Greater Than or Equal (a < b)
     - Operator Less Than or Equal (a = b)
     - Operator Less Than or Equal (a > b)
     - Malformed Expression
2. **If Statement:**
   - **Tests:**
     - If with Variable Non-Zero
     - If with Variable Zero
     - If with Variable Not Defined (should error)
3. **While Statement:**
   - **Tests:**
     - Compute 1+2+...+10
     - While with Variable Zero
     - While with Variable Not Defined (should error)
4. **Regular Programs:**
   - **Tests:**
     - Verify if Number is Prime

#### 6.3.2. PythonConverter

The same test cases, as for the `Interpreter`, were used. The shared test suite
guarantees that both components produce expected results across various scenarios.

## 7. Conclusions

We have delved into the details of design, architecture, and the underlying
principles that govern **Code Canvas**'s functionality. The implementation
showcases a thoughtful approach to visual programming, providing users with an
intuitive environment to create Python code through drag-and-drop interactions.

The choice of technologies, including `TypeScript`, `React`, `TailwindCSS`, and
the `shadcn/ui` component library, reflects a commitment to a modern and efficient
development stack. The integration of `Vite` as a build tool, `Vitest` for testing,
and the use of `ESLint` and `Prettier` for code quality contribute to a robust
and maintainable codebase.

The detailed exploration of the system's architecture, component design, and user
interface design provides a comprehensive understanding of how different elements
come together to deliver a seamless user experience. The color palette, typography
choices, and the visual syntax for code blocks all contribute to the aesthetic
appeal and usability of the application.

Overall, the flexible architecture, user-friendly interface, and extensive testing
ensure a reliable and enjoyable platform for users.
