/*
    Add, remove or edit questions in this file.

    type: "single"   -> one correct answer; radio buttons are shown
    type: "multiple" -> more than one correct answer; checkboxes are shown

    correctAnswers contains the zero-based indexes of the correct choices.
*/

const quizQuestions = [
    {
        id: 1,
        type: "multiple",
        question: "शब्द के सही पर्यायवाची शब्दों को चुनिए।",
        options: [
            "सुगंध",
            "खुशबू",
            "हर्ष",
            "उल्लास"
        ],
        correctAnswers: [0, 1],
        explanation:
            "A class uses the extends keyword to inherit from another class. The implements keyword is used when a class implements an interface."
    },
    {
        id: 2,
        type: "multiple",
        question: "Which of the following are primitive data types in Java?",
        options: [
            "int",
            "String",
            "boolean",
            "double"
        ],
        correctAnswers: [0, 2, 3],
        explanation:
            "int, boolean and double are primitive types. String is a class in java.lang, so it is a reference type rather than a primitive type."
    },
    {
        id: 3,
        type: "single",
        question: "Which collection does not allow duplicate elements?",
        options: [
            "List",
            "Set",
            "ArrayList",
            "LinkedList"
        ],
        correctAnswers: [1],
        explanation:
            "Set represents a collection of unique elements. List implementations such as ArrayList and LinkedList can contain duplicate values."
    },
    {
        id: 4,
        type: "multiple",
        question: "Which statements about Java interfaces are true?",
        options: [
            "A class can implement multiple interfaces.",
            "An interface can contain default methods.",
            "An interface can be instantiated directly with new.",
            "An interface can contain static methods."
        ],
        correctAnswers: [0, 1, 3],
        explanation:
            "A class may implement multiple interfaces, and interfaces can define default and static methods. An interface itself cannot be instantiated directly."
    },
    {
        id: 5,
        type: "single",
        question: "What is the entry point of a standard Java console application?",
        options: [
            "start()",
            "run()",
            "main()",
            "init()"
        ],
        correctAnswers: [2],
        explanation:
            "The JVM starts a standard Java application by invoking its main method, conventionally declared as public static void main(String[] args)."
    },
    {
        id: 6,
        type: "multiple",
        question: "Which of these are checked exceptions in Java?",
        options: [
            "IOException",
            "SQLException",
            "NullPointerException",
            "ClassNotFoundException"
        ],
        correctAnswers: [0, 1, 3],
        explanation:
            "IOException, SQLException and ClassNotFoundException are checked exceptions. NullPointerException extends RuntimeException and is unchecked."
    }
];
