import { createRoot, Root } from 'react-dom/client';
import React from 'react';

import './styles/app.scss';

function App(): React.ReactElement {
    return (<> </>);
}

let node: HTMLElement | null = document.getElementById('root');

if (node !== null) {
    let root: Root = createRoot(node);
    root.render(<App />);
}
