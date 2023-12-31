/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../test-support/test-utils';
import CreateWorkPackageFormView from '../../../pages/CreateWorkPackagePage/CreateWorkPackageFormView';
import { useQuery } from '../../../hooks/utils.hooks';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../../hooks/utils.hooks');

vi.mock('../../../components/ReactHookTextField', () => {
  return {
    __esModule: true,
    default: () => <p>React hook text field component</p>
  };
});

const mockedUseQuery = useQuery as jest.Mock<URLSearchParams>;

const mockUseQuery = () => {
  mockedUseQuery.mockReturnValue(new URLSearchParams(''));
};
const setWbsNum = (str: string) => {};

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (allowSubmit: boolean) => {
  return render(
    <BrowserRouter>
      <CreateWorkPackageFormView
        onSubmit={() => null}
        onCancel={() => null}
        allowSubmit={allowSubmit}
        wbsNum=""
        setWbsNum={setWbsNum}
      />
    </BrowserRouter>
  );
};

describe.skip('create wp form view test suite', () => {
  it('disables submit button when allowSubmit is false', () => {
    mockUseQuery();
    renderComponent(false);

    expect(screen.getByText('Create')).toBeDisabled();
  });

  it('enables submit button when allowSubmit is true', () => {
    mockUseQuery();
    renderComponent(true);

    expect(screen.getByText('Create')).not.toBeDisabled();
  });
});
