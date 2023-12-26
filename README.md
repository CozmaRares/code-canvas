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

Platforms like _Scratch_ and _Blockly_ provide a thoughtful abstraction of classic
programming concepts. These environments offer an alternative to traditional
text-based coding, providing a more intuitive approach to programming concepts.
The graphical representation of code structures and the drag-and-drop
functionality make it easier for beginners to grasp fundamental programming
concepts without the immediate need to memorize syntax. This evolution aligns
with the broader trend observed in contemporary design and development tools.
Great examples of such tools would be _Web Flow_, _Framer_, and _Figma_, which
exemplify how visual editors have become a part of the workflows of professionals.

The context in with which **Code Canvas** alligns is characterized by an understanding
that programming should be a skill accessible to all.

### 1.2. Motivation

The motivation behind the **Code Canvas** project is rooted the recreation of
_Blockly_ with a handful features. While _Blockly_ has made more significant
strides in simplifying programming concepts, **Code Canvas** seeks to refine
this approach further by offering a focused subset of features.

The decision to recreate _Blocky_ with a smaller set of features is driven by a
commitment to providing a more approachable entry point into programming for users.
By including the essential components of programming languages, including if
statements, while loops, variables, and print statements, **Code Canvas** aims
to create an environment that facilitates understanding programming concepts.
This intentional simplification addresses the unique needs of beginners, allowing
them to build a solid foundation before delving into more advanced programming constructs.

### 1.3. Objectives

1. **Streamlined Recreation of Blockly:**

   - _Description:_ **Code Canvas** aims to recreate the simplicity of _Blockly_
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

_TypeScript_, a superset of JavaScript, was chosen as the primary programming
language. Its static typing apabilities provide enhanced code quality and
improved developer productivity. The strong type-checking helps catch errors
during development, ensuring a robust and maintainable codebase.

#### 2.1.2. React

The project leverages _React_, a widely adopted JavaScript library for building
user interfaces. React's component-based architecture allows for the creation of
modular and reusable UI elements, facilitating the development of a dynamic
and responsive visual coding environment.

### 2.2. Styling

#### 2.2.1. TailwindCSS

_TailwindCSS_ was employed for styling in **Code Canvas**. Its utility-first
approach and flexibility allowed for rapid styling and a consistent design
language throughout the application.

#### 2.2.2. shadcn/ui

The _shadcn/ui_ component library played a crucial role in enhancing the user
interface of **Code Canvas**. Leveraging pre-built components from this library
not only sped-up development but also contributed to a cohesive and aesthetically
pleasing design.

### 2.3. Tools

#### 2.3.1. Vite

_Vite_ was chosen as the build tool. Its speed and efficiency in module
bundling, coupled with features like hot module replacement (HMR), significantly
expedited the development workflow. Vite's seamless integration with _TypeScript_
and _React_ contributed to a smooth and optimized development experience.

#### 2.3.2. ESLint

_ESLint_ is employed for static code analysis in **Code Canvas**. Its configurable
rules and automatic code fixing contribute to identifying potential issues early
in the development process.

#### 2.3.3. Prettier

_Prettier_ is utilized for code formatting. Its opinionated approach to code
styling ensures a standardized and visually appealing codebase.

### 2.4. Testing Frameworks

#### 2.4.1. Vitest

_Vitest_ is utilized for unit testing. Its simplicity and integration with the
_Vite_ ecosystem make it a suitable choice for validating the functionality of
individual units of code.

#### 2.4.2. Cypress

_Cypress_ is employed for end-to-end testing. Its comprehensive testing capabilities,
including real-time interaction with the application, ensure a robust evaluation
of the application's behavior in a simulated user environment.

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
elements from the _shadcn/ui_ library, ensuring a cohesive and aesthetically
pleasing design. Throughout the interface, visual cues, user prompts, and
drag-and-drop functionality work in harmony, empowering users to effortlessly
experiment with programming concepts.

Visual Elements:

- Color Palette:
  - Adopting a thoughtfully curated theme from the _shadcn/ui_ library, the light
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
     The visual representation allows for a clear understanding of the program's structure.

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

By following this user workflow, individuals can easily navigate the Code Canvas
environment, experiment with programming concepts, and create visually expressive
code structures in an accessible and engaging manner.

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

#### 4.2.1. Model Definition

The definition of each code block begins with a 'model', represented as a node
in the syntax tree of the program. The 'GenericCodeBlockModel' interface, along
with its extensions, outlines essential attributes such as a unique identifier
('id'), a type identifier ('type'), and properties ('props') specific to each
block. Additionally, some blocks may include an 'expression list' or 'statements
list' to enhance their functionality.

```TypeScript
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

The 'CodeBlock' component dictates the structure of each code block, acting as a
wrapper for child nodes and featuring a delete button for user interaction. This
structure is modular and consistent across all code blocks, simplifying the
addition of new blocks and ensuring a consistent structures of each code block.

Here is an example of how it is used:

```TypeScript
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

All code blocks are organized within the 'codeBlocks' object in the 'lib/code-block.tsx'
file. This object plays a crucial role in managing the various types of code
blocks and incorporates essential information for each block, including the
React component, preview properties, model, and orientation. The keys of the
object are uniquely defined strings chosen by the developer, representing the
type of each block.

```TypeScript
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

1.  Define a new model file in the 'lib/models' directory describing the new block.

    ```TypeScript
    export const newBlockType = "new block" as const;

    type NewBlockProps = Record<string, any>;

    export class NewBlockModel
      implements GenericCodeBlockModel<NewBlockProps>
    {
      id: string;
      type = newBlockType;
      props: NewBlockProps;

      constructor(id: string) {
        this.id = id;
        this.props = {};
      }
    }
    ```

2.  Create a new UI component in the 'components/blocks' directory for the new block.

    ```TypeScript
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

3.  Optionally, add new colors in the 'components/blocks/utils/colors.tsx' file.

    ```TypeScript
    export const newBlockColor = makeColor("#ffffff", "#000000");
    ```

    > **Note**: if the color is not defined, it defaults to _pink_ for light mode
    > and _indigo_ for dark mode.

4.  Define the syntactically equivalent Python code for the new block.

    ```TypeScript
    static statementName(model: NewBlockModel, indent = 0): string[] {
        return " ''' new python statment ''' ";
    }
    ```

5.  Implement the logic needed to interpret the new block within the 'Interpreter'
    class.

        ```TypeScript
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

#### 4.4.2. Interpreter

#### 4.4.3. Python Converter

### 4.5. Drag and Drop Functionality

#### 4.5.1. DnD Kit

#### 4.5.2.

### 4.7. User Feedback

### 4.8. Accessibility

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

## 7. Conclusions
