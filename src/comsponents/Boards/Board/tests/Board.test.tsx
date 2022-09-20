import {render} from '@testing-library/react';
import { Board } from '../Board';

const mockUseBoard = jest.fn().mockReturnValue({
    isAdd: true,
    startAdd: () => null,
    newColumnTitle: 'test title',
    onNewColumnTitleChange: () => null,
    onCancelAddNewColumn: () => null,
    addColumn: () => null,
    columns:[{id:'test_id', title: 'test'}],
});
jest.mock('../useBoard', () => {
    const module = jest.requireActual('../useBoard');
    return {
        ...module,
        useBoard: (...p:any) => mockUseBoard(...p)
    }
});

describe('Board component',  () =>{
    it('default render', ()=> {
        const {asFragment } = render(<Board/>);

        expect(asFragment()).toMatchSnapshot();
    })
})