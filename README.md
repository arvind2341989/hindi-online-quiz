# Online Quiz Website

A static quiz application built with HTML, CSS and JavaScript. It can be hosted directly on GitHub Pages.

## Features

- Single-answer questions using radio buttons
- Multiple-answer questions using checkboxes
- Correct-answer display after submission
- Explanation for every question
- Score tracking
- Progress indicator
- Final percentage and summary
- Responsive layout
- No server or database required
- Easy question-bank customization

## Project Structure

```text
online-quiz-github-pages/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── questions.js
    └── app.js
```

## Adding Questions

Edit `js/questions.js`.

### Single-answer question

```javascript
{
    id: 7,
    type: "single",
    question: "Which keyword creates an object in Java?",
    options: ["class", "new", "this", "static"],
    correctAnswers: [1],
    explanation: "The new keyword is commonly used to instantiate a class."
}
```

`correctAnswers` uses zero-based indexes:

- `0` = first option
- `1` = second option
- `2` = third option
- `3` = fourth option

### Multiple-answer question

```javascript
{
    id: 8,
    type: "multiple",
    question: "Which are Java access modifiers?",
    options: ["public", "private", "protected", "include"],
    correctAnswers: [0, 1, 2],
    explanation: "public, private and protected are Java access modifiers."
}
```

## Run Locally

You can open `index.html` directly in a browser.

For local development, you may also use a simple web server such as VS Code Live Server.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload all files and folders from this project.
3. Push them to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`.
7. Save the configuration.
8. GitHub will provide the public URL after deployment.

Because the website uses only relative file paths, no code changes are required when hosting under a GitHub Pages repository URL.
