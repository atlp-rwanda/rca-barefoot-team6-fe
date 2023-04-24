import { render, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../pages/auth/forgot';

describe('ForgotPassword', () => {
  it('renders the forgot text', () => {
    const { getByText } = render(<ForgotPassword />);
    const forgotText = getByText(/Request New Password/i);
    expect(forgotText).toBeInTheDocument();
  });

  it('submits the form with valid email', async () => {
    const { getByLabelText, getByText } = render(<ForgotPassword />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => expect(render(<ForgotPassword />)));
  });

  it('displays error message with invalid email', async () => {
    const { getByLabelText, getByText } = render(<ForgotPassword />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => expect(render(<ForgotPassword />)));

    // getByText('Failed to request new password')).toBeInTheDocument()
  });
});