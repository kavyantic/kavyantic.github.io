import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'New Board',
    Board: () => <div></div>,
    environmentProps: {
        canvasHeight: 118,
        canvasBackgroundColor: '#d24c4c',
        windowWidth: 900
    }
});
