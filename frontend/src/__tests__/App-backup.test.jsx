import { render, screen, waitFor } from '@testing-library/react'
import AppBackup from '../App-backup'
import userEvent from '@testing-library/user-event'

describe('AppBackup', () => {
    it('renders AppBackup', () => {
        render(<AppBackup />)

        expect(screen.getByText('Vite + React')).toBeInTheDocument()
    });

    it("should increment count on click", async () => {
      render(<AppBackup />);
      const counter = screen.getByRole("button", { name: /count is/i });
      expect(counter.textContent).toBe("count is 0");
      await userEvent.click(counter);
      expect(counter.textContent).toBe("count is 1");
    });
})