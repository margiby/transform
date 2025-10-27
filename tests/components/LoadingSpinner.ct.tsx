import { test, expect } from '@playwright/experimental-ct-react';
import LoadingSpinner from '../../src/components/common/LoadingSpinner';

test.describe('LoadingSpinner Component', () => {
  test('should render with default message', async ({ mount }) => {
    const component = await mount(<LoadingSpinner />);
    
    // Check if spinner is visible
    await expect(component.locator('.loading-spinner')).toBeVisible();
    
    // Check if default message is displayed
    await expect(component.locator('.loading-spinner-text')).toHaveText('Lädt...');
  });

  test('should render with custom message', async ({ mount }) => {
    const customMessage = 'Bitte warten...';
    const component = await mount(<LoadingSpinner message={customMessage} />);
    
    // Check if custom message is displayed
    await expect(component.locator('.loading-spinner-text')).toHaveText(customMessage);
  });

  test('should render spinner only without message', async ({ mount }) => {
    const component = await mount(<LoadingSpinner spinnerOnly={true} />);
    
    // Check if spinner is visible
    await expect(component.locator('.loading-spinner')).toBeVisible();
    
    // Check if message text is not displayed
    await expect(component.locator('.loading-spinner-text')).not.toBeVisible();
  });

  test('should render with custom React node as message', async ({ mount }) => {
    const component = await mount(
      <LoadingSpinner message={<span data-testid="custom-message">Custom Message</span>} />
    );
    
    // Check if custom React node is rendered
    await expect(component.getByTestId('custom-message')).toBeVisible();
    await expect(component.getByTestId('custom-message')).toHaveText('Custom Message');
  });

  test('should have correct CSS classes', async ({ mount }) => {
    const component = await mount(<LoadingSpinner />);
    
    // Check if all required CSS classes are present
    await expect(component).toContainText('Lädt...');
    await expect(component.locator('.loading-spinner-container')).toBeVisible();
    await expect(component.locator('.loading-spinner')).toBeVisible();
  });
});
