// Styles to be injected into Shadow DOM
export const getShadowStyles = () => `
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon input {
  padding-right: 32px; 
}

.input-with-icon .icon-button {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.input-with-icon .icon-button:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-50%) scale(1.05);
}

.input-with-icon .icon-button.active {
  background: rgba(59, 130, 246, 0.2);
  color: #2563eb;
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.inspector-toolbar-wrapper {
  width: 680px;
  background:  #ffffff;
  color: #1e293b;
  border-radius: 10px;
  padding: 8px 6px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(37, 99, 235, 0.2), 0 1px 4px rgba(0, 0, 0, 0.1);
  border: 1.5px solid #e2e8f0;
  transition: transform 0.3s ease, 
              max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  max-height: min(90vh, 600px);
  will-change: max-height;
}

.inspector-toolbar-wrapper.collapsed {
  max-height: 56px;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.inspector-toolbar-wrapper:not(.collapsed) {
  max-height: min(90vh, 600px);
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.inspector-toolbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  height: 40px;
  min-height: 40px;
  flex-shrink: 0;
}

.inspector-toolbar-collapse {
  background-color: transparent;
  border: none;
  color: #475569;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inspector-toolbar-collapse svg {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.inspector-toolbar-collapse:hover {
  transform: translateY(-1px);
}

.toolbar-left, .toolbar-right {
  display: flex;
  align-items: center;
}

.toolbar-logo {
  background: #374151;
  font-weight: 700;
  margin-right: 12px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 15px;
  letter-spacing: -0.3px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
}

.toolbar-button {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border: 1.5px solid #e5e7eb;
  color: #475569;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-weight: 500;
  font-size: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 28px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 6px;
  will-change: transform, box-shadow;
}

.toolbar-button:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  border-color: #94a3b8;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.custom-event-form-container {
  background: #ffffff;
  padding: 16px 8px;
  padding-bottom: 0;
  border-top: 1.5px solid #e5e7eb;
  border-radius: 0 0 10px 10px;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), 
              padding 0.35s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.25s ease-in-out,
              transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              border-top-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  overflow-x: hidden;
  max-height: min(calc(90vh - 100px), 520px);
  opacity: 1;
  display: flex;
  flex-direction: column;
  transform-origin: top;
  transform: scaleY(1);
  will-change: max-height, transform, opacity;
  position: relative;
}

.custom-event-form-container.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  border-top-width: 0;
  transform: scaleY(0.95);
  transition-delay: 0s;
}

/* Reset common styles that might be inherited */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

input, select, textarea, button {
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
}

input[type="text"],
input[type="email"],
select,
textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #1e293b;
  transition: all 0.2s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6,9 12,15 18,9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 32px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

/* Stepper styles */
.stepper-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  opacity: 0;
  transition: opacity 0.2s ease-out;
  position: relative;
}

.custom-event-form-container:not(.collapsed) .stepper-container {
  opacity: 1;
  transition: opacity 0.25s ease-in 0.05s;
}

.stepper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 12px;
  margin-bottom: 8px;
}

.stepper-title {
  font-size: 17px;
  font-weight: 600;
  color: #374151;
}

.stepper-progress {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
}

.stepper-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
  transition: all 0.3s ease;
}

.step-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.stepper-connector {
  flex: 1;
  height: 1px;
  background: #e5e7eb;
  margin: 0 12px;
  position: relative;
  top: -9px;
}

.stepper-step.active .step-number {
  background: #2563eb;
  color: white;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);
}

.stepper-step.active .step-label {
  color: #374151;
  font-weight: 600;
}

.stepper-step.completed .step-number {
  background: #059669;
  color: white;
  box-shadow: 0 2px 6px rgba(5, 150, 105, 0.2);
}

.stepper-step.will-skip {
  opacity: 0.5;
}

.stepper-step.will-skip .step-number {
  background: #6b7280;
  color: white;
}

.stepper-step.will-skip .step-label {
  color: #6b7280;
  font-style: italic;
}

.stepper-content {
  position: relative;
  overflow-y: visible;
  overflow-x: hidden;
  flex: 1;
  padding-bottom: 16px;
  min-height: 0;
}

.custom-event-form-container::-webkit-scrollbar {
  width: 6px;
}

.custom-event-form-container::-webkit-scrollbar-track {
  background: rgba(148, 163, 184, 0.1);
  border-radius: 3px;
}

.custom-event-form-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.custom-event-form-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
}

.step-content {
  display: none;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
  padding-bottom: 16px;
}

.step-content.active {
  display: block;
  opacity: 1;
  transform: translateX(0);
}

.form-group-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.form-group-row-split {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.form-group-half {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.type-selector {
  display: flex;
  gap: 8px;
}

.type-option {
  flex: 1;
  padding: 8px 16px;
  border: 1.5px solid #e5e7eb;
  background: white;
  color: #64748b;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.type-option:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.type-option.active {
  background: #3b82f6;
  color: white;
  border-color: #2563eb;
}

/* Selector and Attribute blocks */
.selector-block,
.attribute-block {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  position: relative;
}

.selector-header,
.attribute-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.selector-title,
.attribute-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.remove-selector-btn,
.remove-attribute-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.remove-selector-btn:hover,
.remove-attribute-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  transform: scale(1.1);
}

.remove-selector-btn-hide,
.remove-attribute-btn-hide {
  display: none;
}

.page-pattern-container {
  display: flex;
  gap: 8px;
}

.pattern-operator {
  flex: 0 0 140px;
}

.pattern-value {
  flex: 1;
}

.attribute-fields {
  display: flex;
  gap: 8px;
}

.attribute-name-field {
  flex: 0 0 180px;
}

.attribute-value-field {
  flex: 1;
}

.add-selector-btn,
.add-attribute-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 2px dashed #cbd5e1;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.add-selector-btn:hover,
.add-attribute-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

/* Form actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
  padding-bottom: 0px;
  border-top: 1.5px solid #e5e7eb;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #ffffff;
}

#prev-step-btn,
#next-step-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  height: 40px;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 120px;
}

#prev-step-btn {
  background: white;
  border: 1.5px solid #e5e7eb;
  color: #4b5563;
}

#prev-step-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

#next-step-btn {
  background: #2563eb;
  color: white;
  border: 1.5px solid #1d4ed8;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
  position: relative;
  overflow: hidden;
}

#next-step-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

/* Loading spinner */
.spinner {
  animation: rotate 1s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

.spinner circle:last-child {
  stroke-dasharray: 62.83;
  stroke-dashoffset: 62.83;
  animation: dash 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 62.83;
  }
  50% {
    stroke-dashoffset: 15.71;
  }
  100% {
    stroke-dashoffset: 62.83;
  }
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.toast-message {
  min-width: 300px;
  max-width: 400px;
  padding: 14px 18px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: auto;
  animation: toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  line-height: 1.4;
}

.toast-message::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: currentColor;
  opacity: 0.8;
}

.toast-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-content {
  flex: 1;
  word-wrap: break-word;
}

.toast-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  color: currentColor;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-close:hover {
  opacity: 1;
}

.toast-message.success {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toast-message.error {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);
  color: white;
  border: 1px solid rgba(239, 68, 68, 0.3);
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toast-message.info {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%);
  color: white;
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toast-message.warning {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.95) 0%, rgba(249, 115, 22, 0.95) 100%);
  color: white;
  border: 1px solid rgba(251, 146, 60, 0.3);
  box-shadow: 0 4px 20px rgba(251, 146, 60, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  animation: toastProgress 5s linear;
  transform-origin: left;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toastSlideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes toastProgress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* Error states */
.field-error-message {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  animation: slideIn 0.2s ease;
}

input.error,
select.error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* Disabled states */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}

.border-none {
  border: none !important;
}

.toolbar-left {
  flex-grow: 1;
}

.toolbar-right {
  gap: 8px;
}

/* Responsive adjustments for small screen heights */
@media (max-height: 700px) {
  .inspector-toolbar-wrapper {
    max-height: 85vh;
  }
  
  .inspector-toolbar-wrapper:not(.collapsed) {
    max-height: 85vh;
  }
  
  .custom-event-form-container {
    max-height: calc(85vh - 90px);
  }
  
  .stepper-progress {
    margin-bottom: 15px;
  }
  
  .stepper-header {
    padding-bottom: 8px;
    margin-bottom: 6px;
  }
  
  .form-group-row,
  .form-group-row-split {
    margin-bottom: 12px;
  }
  
  .stepper-content {
    padding-bottom: 12px;
  }
}

@media (max-height: 600px) {
  .inspector-toolbar-wrapper {
    max-height: 80vh;
  }
  
  .inspector-toolbar-wrapper:not(.collapsed) {
    max-height: 80vh;
  }
  
  .custom-event-form-container {
    max-height: calc(80vh - 80px);
    padding: 12px 8px;
    padding-bottom: 0;
  }
  
  .stepper-progress {
    margin-bottom: 12px;
  }
  
  .stepper-header {
    padding-bottom: 6px;
    margin-bottom: 4px;
  }
  
  .stepper-title {
    font-size: 15px;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
  
  .step-label {
    font-size: 11px;
  }
  
  .form-group-row,
  .form-group-row-split {
    margin-bottom: 10px;
  }
  
  .form-group-row label,
  .form-group-half label {
    font-size: 13px;
    margin-bottom: 4px;
  }
  
  #custom-event-form input,
  #custom-event-form select {
    height: 36px;
    padding: 8px 10px;
    font-size: 13px;
  }
  
  .stepper-content {
    padding-bottom: 10px;
  }
  
  #prev-step-btn,
  #next-step-btn,
  #cancel-btn {
    height: 36px;
    font-size: 13px;
    padding: 6px 14px;
  }
}

@media (max-height: 500px) {
  .inspector-toolbar-wrapper {
    max-height: 75vh;
  }
  
  .inspector-toolbar-wrapper:not(.collapsed) {
    max-height: 75vh;
  }
  
  .custom-event-form-container {
    max-height: calc(75vh - 50px);
    padding: 10px 6px;
    overflow-y: auto;
    padding-bottom: 0;
  }
  
  .stepper-progress {
    margin-bottom: 10px;
  }
  
  .stepper-connector {
    margin: 0 8px;
  }
  
  .step-number {
    width: 24px;
    height: 24px;
    font-size: 11px;
    margin-bottom: 4px;
  }
  
  .form-group-row,
  .form-group-row-split {
    margin-bottom: 8px;
  }
  
  #custom-event-form input,
  #custom-event-form select {
    height: 32px;
    padding: 6px 8px;
  }
  
  .selector-block,
  .attribute-block {
    padding: 12px;
  }
  
  .stepper-content {
    padding-bottom: 8px;
  }
  
  .form-actions {
    padding: 8px 12px 4px;
    padding-bottom: 0;
  }
  
  #prev-step-btn,
  #next-step-btn,
  #cancel-btn {
    height: 32px;
    font-size: 12px;
    padding: 4px 12px;
    min-width: 80px;
  }
}
`;