import { renderHook, act } from '@testing-library/react-hooks';
import { useBoard } from '../useBoard';

const mockUseSelector = jest.fn().mockReturnValue({ item: { columns: [] } });
jest.mock('react-redux', () => {
    const module = jest.requireActual('react-redux')
    return {
        ...module,
        useSelector: (...p: any) => mockUseSelector(...p)
    }
});

const mockDispatch = jest.fn();
const mockUseAppDispatch = jest.fn().mockReturnValue(mockDispatch);
jest.mock('../../../../utils/hooks/useAppDispatch', () => {
    const module = jest.requireActual('../../../../utils/hooks/useAppDispatch')
    return {
        ...module,
        useAppDispatch: (...p: any) => mockUseAppDispatch(...p)
    }
})

const mockCreateAction = jest.fn().mockReturnValue({});
const mockGetAction = jest.fn().mockReturnValue({});
jest.mock('../../../../utils/actions/actions', () => {
    const module = jest.requireActual('../../../../utils/actions/actions')
    return {
        ...module,
        createAction: (...p: any) => mockCreateAction(...p),
        getAction: (...p: any) => mockGetAction(...p)
    }
})

describe('useBoard hook', () => {
    it('should update new column title', () => {

        const { result } = renderHook(() => useBoard());
        act(() => {
            result.current.onNewColumnTitleChange({ target: { value: 'test value' } } as React.ChangeEvent<HTMLInputElement>)
        })

        expect(result.current.newColumnTitle).toBe('test value');
    });

    it('should call action and clear title', () => {

        const { result } = renderHook(() => useBoard());
        mockCreateAction.mockClear();
        act(() => {
            result.current.addColumn()
        })

        expect(mockCreateAction).toBeCalled();
        expect(result.current.newColumnTitle).toBe('');
    });
})