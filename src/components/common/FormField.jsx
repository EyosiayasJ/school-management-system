import PropTypes from 'prop-types';
import { Fragment } from 'react';

/**
 * FormField Component
 * 
 * A versatile form input component that supports multiple input types with consistent styling,
 * accessibility features, and validation. This component handles various input types including
 * text, textarea, select, checkbox, radio, switch, number, date, and more.
 * 
 * Features:
 * - Consistent styling across different input types
 * - Built-in error handling and validation display
 * - Help text support for additional information
 * - Accessibility attributes (ARIA) for better screen reader support
 * - Support for required, disabled, and read-only states
 * 
 * @component
 * @example
 * // Basic text input
 * <FormField
 *   label="Username"
 *   name="username"
 *   value={username}
 *   onChange={handleChange}
 *   required
 * />
 * 
 * // Select dropdown
 * <FormField
 *   type="select"
 *   label="Country"
 *   name="country"
 *   value={country}
 *   onChange={handleChange}
 *   options={countryOptions}
 * />
 */
const FormField = ({
  id,
  label,
  type = 'text',
  name,
  value = '',
  onChange,
  onBlur,
  placeholder,
  error,
  helpText,
  required = false,
  disabled = false,
  readOnly = false,
  options = [],
  multiple = false,
  min,
  max,
  step,
  rows = 3,
  // eslint-disable-next-line no-unused-vars
  className = '',
  labelClassName = '',
  inputClassName = '',
  containerClassName = '',
  children,
}) => {
  // Ensure id and name are always defined
  const fieldId = id || `field-${Math.random().toString(36).substring(2, 9)}`;
  const fieldName = name || fieldId;

  /**
   * Renders the appropriate input element based on the specified type
   * 
   * @returns {JSX.Element} The input element for the form field
   */
  const renderInput = () => {
    const baseInputClasses = `w-full rounded-md shadow-sm border px-3 py-2 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
      ${error ? 'border-red-300' : 'border-gray-300'}
      ${inputClassName}`;

    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            name={fieldName}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClasses}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
        );

      case 'select':
        return (
          <select
            id={fieldId}
            name={fieldName}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClasses}
            disabled={disabled}
            required={required}
            multiple={multiple}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          >
            {!required && !multiple && !children && (
              <option value="">{placeholder || 'Select an option'}</option>
            )}
            {options.length > 0 && options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {children}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center h-5">
            <input
              id={fieldId}
              name={fieldName}
              type="checkbox"
              checked={!!value}
              onChange={onChange}
              onBlur={onBlur}
              className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${inputClassName}`}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              aria-invalid={!!error}
              aria-describedby={error ? `${fieldId}-error` : undefined}
            />
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`${fieldId}-${option.value}`}
                  name={fieldName}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${inputClassName}`}
                  disabled={disabled}
                  readOnly={readOnly}
                  required={required}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${fieldId}-error` : undefined}
                />
                <label
                  htmlFor={`${fieldId}-${option.value}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'switch':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id={fieldId}
              name={fieldName}
              type="checkbox"
              checked={!!value}
              onChange={onChange}
              onBlur={onBlur}
              className="sr-only peer"
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              aria-invalid={!!error}
              aria-describedby={error ? `${fieldId}-error` : undefined}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );

      // Number input
      case 'number':
        return (
          <input
            id={fieldId}
            name={fieldName}
            type="number"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClasses}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
        );

      // Date input
      case 'date':
      case 'datetime-local':
      case 'time':
        return (
          <input
            id={fieldId}
            name={fieldName}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClasses}
            min={min}
            max={max}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
        );

      // Default to text input for all other types
      default:
        return (
          <input
            id={fieldId}
            name={fieldName}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseInputClasses}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
        );
    }
  };

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {/* Label (except for checkbox which has label after input) */}
      {label && type !== 'checkbox' && (
        <label
          htmlFor={fieldId}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input element */}
      {type === 'checkbox' ? (
        <div className="flex items-center">
          {renderInput()}
          {label && (
            <label
              htmlFor={fieldId}
              className={`ml-2 block text-sm text-gray-700 ${labelClassName}`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
        </div>
      ) : (
        renderInput()
      )}

      {/* Error message or help text */}
      {error ? (
        <p className="mt-1 text-sm text-red-600" id={`${fieldId}-error`}>
          {error}
        </p>
      ) : helpText ? (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      ) : null}

      {/* Children for custom content */}
      {children}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  multiple: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rows: PropTypes.number,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  children: PropTypes.node
};

export default FormField;