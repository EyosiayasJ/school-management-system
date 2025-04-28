# school-management-system

## Dashboard Implementation Overview

### Features
- **Quick Links:** Add Student/Teacher modals, Event/Report placeholders, keyboard accessible, ARIA labels.
- **Branch Performance Chart:** Uses `recharts` (install with `npm install recharts`) for visualizing branch stats.
- **Accessibility:** All interactive elements have ARIA labels, tab order, and visible focus states.
- **Error Handling:** Error UI for failed dashboard data loads.
- **Testing:** Example unit test in `src/pages/Dashboard.test.jsx` (uses React Testing Library).

### Usage
- To use the chart, ensure you have `recharts` installed:
  ```bash
  npm install recharts
  ```
- Quick Links open modals or placeholders. Modals update stats and activities in real time.

### Extending
- Replace mock data in `src/mock/db.js` with real API calls as needed.
- Add real event/report modals or navigation in `Dashboard.jsx`.

### Accessibility & UX
- All buttons and quick links are keyboard accessible (tab/enter/space).
- Focus states are visible for accessibility.

### Error Handling
- To simulate an error, uncomment the `setError` line in `Dashboard.jsx`.

### Testing
- Run tests with:
  ```bash
  npm test
  ```
- Example test covers dashboard title and Add Student modal opening.

---
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
