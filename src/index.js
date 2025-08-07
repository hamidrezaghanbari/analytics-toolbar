import './styles.css';

class InspectorToolbar {
  constructor(options = {}) {
    this.options = {
      ...options
    };
    
    this.toolbar = null;
    this.isVisible = false;
    this.isInspecting = false;
    this.highlighter = null;
    this.tooltip = null;
    this.currentStep = 1;
    this.totalSteps = 3;
    this.selectorCount = 1;
    this.attributeCount = 1;
    this.completedSteps = [];
  }

  init() {
    this.createToolbar();
    this.attachToPage();
    this.createInspectorElements();
    return this;
  }

  createToolbar() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'inspector-toolbar';
    this.toolbar.innerHTML = `
      <div class="inspector-toolbar-content">
        <div class="toolbar-left">
          <div class="toolbar-logo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            WebAnalytics Inspector
          </div>
          <div class="toolbar-divider"></div>
          <div class="toolbar-actions">
            <button class="toolbar-button create-event-button" id="create-event-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create Event
            </button>
          </div>
        </div>
        <div class="toolbar-right">
          <button class="toolbar-button hide-toolbar-button" id="hide-toolbar-btn" title="Hide Toolbar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          <button class="inspector-toolbar-collapse">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      <div class="custom-event-form-container collapsed">
        <form id="custom-event-form">
          <div class="stepper-container">
            <div class="stepper-header">
              <div class="stepper-title">Event Builder</div>
              <div class="stepper-controls">
                <button type="button" class="stepper-collapse-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18,15 12,9 6,15"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="stepper-progress">
              <div class="stepper-step active" data-step="1">
                <div class="step-number">1</div>
                <div class="step-label">Event Info</div>
              </div>
              <div class="stepper-connector"></div>
              <div class="stepper-step" data-step="2">
                <div class="step-number">2</div>
                <div class="step-label">Selectors</div>
              </div>
              <div class="stepper-connector"></div>
              <div class="stepper-step" data-step="3">
                <div class="step-number">3</div>
                <div class="step-label">Attributes</div>
              </div>
            </div>

            <div class="stepper-content">
              <!-- Step 1: Event Info -->
              <div class="step-content active" data-step="1">
                <div class="form-group-row">
                  <label>Type</label>
                  <div class="type-selector">
                    <button type="button" class="type-option active" data-type="key">Key</button>
                    <button type="button" class="type-option" data-type="general">General</button>
                  </div>
                </div>
                
                <div class="form-group-row">
                  <label for="event-name">Name</label>
                  <input type="text" id="event-name" name="eventName" placeholder="Add to cart" required>
                </div>
                
                <div class="form-group-row">
                  <label for="event-category">Event Category</label>
                  <select id="event-category" name="category" required>
                    <option value="e-commerce">E-Commerce</option>
                    <option value="engagement">Engagement</option>
                    <option value="analytics">Analytics</option>
                  </select>
                </div>
                
                <div class="form-group-row">
                  <label for="event-type">Event</label>
                  <select id="event-type" name="eventType" required>
                    <option value="DA_ADD_ITEM_TO_CART">DA_ADD_ITEM_TO_CART</option>
                    <option value="click">Click</option>
                    <option value="scroll">Scroll</option>
                    <option value="submit">Submit</option>
                  </select>
                </div>
                
                <div class="form-group-row">
                  <label for="event-trigger">Event Trigger</label>
                  <select id="event-trigger" name="eventTrigger" required>
                    <option value="click">Click</option>
                    <option value="scroll">Scroll</option>
                    <option value="hover">Hover</option>
                  </select>
                </div>
                
                <div class="form-group-row">
                  <label for="count-type">Count Type</label>
                  <select id="count-type" name="countType" required>
                    <option value="per_event">Per event</option>
                    <option value="once">Once</option>
                    <option value="every_time">Every Time</option>
                  </select>
                </div>
              </div>
              
              <!-- Step 2: Selectors -->
              <div class="step-content" data-step="2">
                <div id="selectors-container">
                  <!-- Selector 1 -->
                  <div class="selector-block" data-selector-id="1">
                    <div class="selector-header">
                      <h3 class="selector-title">Selector 1</h3>
                      <button type="button" class="remove-selector-btn" title="Remove Selector">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div class="form-group-row">
                      <label>Element Selector</label>
                      <div class="input-with-icon">
                        <input type="text" name="elementSelector[]" placeholder="#add_to_cart" required>
                        <button type="button" class="selector-inspect-btn toolbar-button icon-button" title="Inspect Element">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-crosshair"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
                        </button>
                      </div>
                    </div>
                    
                    <div class="form-group-row">
                      <label>Page Pattern (Optional)</label>
                      <div class="page-pattern-container">
                        <div class="pattern-operator">
                          <select name="patternOperator[]" class="pattern-operator-select">
                            <option value="equals">Equals</option>
                            <option value="contains">Contains</option>
                            <option value="startsWith">Starts with</option>
                            <option value="endsWith">Ends with</option>
                            <option value="regex">Regex</option>
                          </select>
                        </div>
                        <input type="text" name="patternValue[]" class="pattern-value" placeholder="Value">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Add Selector Button -->
                  <button type="button" id="add-selector-btn" class="add-selector-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Another Selector
                  </button>
                </div>
              </div>
              
              <!-- Step 3: Attributes -->
              <div class="step-content" data-step="3">
                <div id="attributes-container">
                  <!-- Attribute 1 -->
                  <div class="attribute-block" data-attribute-id="1">
                    <div class="attribute-header">
                      <h3 class="attribute-title">Attribute 1 (Optional)</h3>
                      <button type="button" class="remove-attribute-btn" title="Remove Attribute">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div class="attribute-fields">
                      <div class="attribute-name-field">
                        <select name="attributeName[]" class="attribute-name-select">
                          <option value="">Select Name</option>
                          <option value="id">ID</option>
                          <option value="class">Class</option>
                          <option value="data-value">Data Value</option>
                          <option value="text">Text Content</option>
                          <option value="href">Link (href)</option>
                          <option value="src">Image Source</option>
                          <option value="alt">Alt Text</option>
                          <option value="title">Title</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>
                      
                      <div class="attribute-value-field">
                        <div class="input-with-icon">
                          <input type="text" name="attributeValue[]" placeholder="Like &#34;#sale.price&#34;">
                          <button type="button" class="inspect-attribute-btn toolbar-button icon-button" title="Inspect Element">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-crosshair"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Add Attribute Button -->
                  <button type="button" id="add-attribute-btn" class="add-attribute-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add New
                  </button>
                </div>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" id="cancel-btn" class="secondary-btn">Cancel</button>
              <button type="button" id="prev-step-btn" class="secondary-btn" disabled>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>
              <button type="button" id="next-step-btn">
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    this.applyStyles();
    this.bindEvents();
  }

  createInspectorElements() {
    this.highlighter = document.createElement('div');
    this.highlighter.className = 'inspector-highlighter';
    document.body.appendChild(this.highlighter);

    this.tooltip = document.createElement('div');
    this.tooltip.className = 'inspector-tooltip';
    document.body.appendChild(this.tooltip);
  }

  applyStyles() {
    const initialY = this.options.position === 'top' ? '-100%' : '100%';
    Object.assign(this.toolbar.style, {
      position: 'fixed',
      bottom: this.options.position === 'bottom' ? '32px' : '60px',
      left: '50%',
      height: this.options.height,
      backgroundColor: this.options.backgroundColor,
      color: this.options.textColor,
      zIndex: '9999',
      transform: `translateX(-50%) translateY(${initialY})`,
      transition: 'transform 0.3s ease'
    });
  }

  bindEvents() {
    const collapseBtn = this.toolbar.querySelector('.inspector-toolbar-collapse');
    collapseBtn.addEventListener('click', () => this.toggleCollapse());

    const hideBtn = this.toolbar.querySelector('#hide-toolbar-btn');
    hideBtn.addEventListener('click', () => this.hide());

    const createEventBtn = this.toolbar.querySelector('#create-event-btn');
    createEventBtn.addEventListener('click', () => this.toggleEventForm());

    const addPathBtn = this.toolbar.querySelector('#add-path-btn');
    if (addPathBtn) {
      addPathBtn.addEventListener('click', () => this.addPathInput());
    }

    const addAttributeBtn = this.toolbar.querySelector('#add-attribute-btn');
    addAttributeBtn.addEventListener('click', () => this.addAttribute());
    
    // Add Selector button
    const addSelectorBtn = this.toolbar.querySelector('#add-selector-btn');
    addSelectorBtn.addEventListener('click', () => this.addSelector());
    
    // Stepper navigation
    const nextStepBtn = this.toolbar.querySelector('#next-step-btn');
    const prevStepBtn = this.toolbar.querySelector('#prev-step-btn');
    const cancelBtn = this.toolbar.querySelector('#cancel-btn');
    
    nextStepBtn.addEventListener('click', () => this.nextStep());
    prevStepBtn.addEventListener('click', () => this.prevStep());
    cancelBtn.addEventListener('click', () => this.closeEventForm());
    
    // Type selector buttons
    const typeOptions = this.toolbar.querySelectorAll('.type-option');
    typeOptions.forEach(option => {
      option.addEventListener('click', () => {
        typeOptions.forEach(btn => btn.classList.remove('active'));
        option.classList.add('active');
      });
    });

    const form = this.toolbar.querySelector('#custom-event-form');
    form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Add real-time validation
    form.addEventListener('input', (e) => {
      if (e.target.hasAttribute('required')) {
        this.validateField(e.target);
      }
    });
    
    form.addEventListener('blur', (e) => {
      if (e.target.hasAttribute('required')) {
        this.validateField(e.target);
      }
    });
    
    this.toolbar.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-path-btn')) {
        this.removePathInput(e.target);
      }
      if (e.target.closest('.remove-attribute-btn')) {
        this.removeAttribute(e.target.closest('.attribute-block'));
      }
      if (e.target.closest('.inspect-attribute-btn')) {
        this.activeAttributeValueInput = e.target.closest('.input-with-icon').querySelector('input');
        this.toggleInspector();
      }
      if (e.target.closest('.selector-inspect-btn')) {
        const inputField = e.target.closest('.input-with-icon').querySelector('input[name="elementSelector[]"]');
        this.activeAttributeValueInput = inputField;
        this.toggleInspector();
      }
      if (e.target.closest('.remove-selector-btn')) {
        this.removeSelector(e.target.closest('.selector-block'));
      }
      if (e.target.closest('.stepper-step')) {
        const stepElement = e.target.closest('.stepper-step');
        const stepNumber = parseInt(stepElement.dataset.step);
        if (!stepElement.classList.contains('active') && this.isStepAccessible(stepNumber)) {
          this.goToStep(stepNumber);
        }
      }
    });
    
    this.boundHandleMouseOver = this.handleMouseOver.bind(this);
    this.boundHandleMouseOut = this.handleMouseOut.bind(this);
    this.boundHandleClick = this.handleClick.bind(this);
  }

  attachToPage() {
    document.body.appendChild(this.toolbar);
  }

  toggleInspector() {
    this.isInspecting = !this.isInspecting;
    if (this.isInspecting) {
      this.startInspecting();
      // Auto-collapse form when starting inspection for better visibility
      this.collapseForm();
    } else {
      this.stopInspecting();
    }
  }

  startInspecting() {
    document.body.style.cursor = 'crosshair';
    // Add active class to all inspect buttons to show they're in inspection mode
    const inspectButtons = this.toolbar.querySelectorAll('.selector-inspect-btn, .inspect-attribute-btn');
    inspectButtons.forEach(btn => btn.classList.add('active'));
    document.addEventListener('mouseover', this.boundHandleMouseOver);
    document.addEventListener('mouseout', this.boundHandleMouseOut);
    document.addEventListener('click', this.boundHandleClick, true);
  }

  stopInspecting() {
    document.body.style.cursor = 'default';
    // Remove active class from all inspect buttons
    const inspectButtons = this.toolbar.querySelectorAll('.selector-inspect-btn, .inspect-attribute-btn');
    inspectButtons.forEach(btn => btn.classList.remove('active'));
    this.highlighter.style.display = 'none';
    this.tooltip.style.display = 'none';
    document.removeEventListener('mouseover', this.boundHandleMouseOver);
    document.removeEventListener('mouseout', this.boundHandleMouseOut);
    document.removeEventListener('click', this.boundHandleClick, true);
  }

  handleMouseOver(e) {
    if (!this.isInspecting) return;
    const target = e.target;
    if (target === this.toolbar || this.toolbar.contains(target) || target === this.highlighter || target === this.tooltip) {
      this.highlighter.style.display = 'none';
      this.tooltip.style.display = 'none';
      return;
    }
    const rect = target.getBoundingClientRect();
    this.highlighter.style.display = 'block';
    this.highlighter.style.top = `${rect.top + window.scrollY}px`;
    this.highlighter.style.left = `${rect.left + window.scrollX}px`;
    this.highlighter.style.width = `${rect.width}px`;
    this.highlighter.style.height = `${rect.height}px`;

    const selector = this.getCssSelector(target);
    this.tooltip.style.display = 'block';
    this.tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
    this.tooltip.style.left = `${rect.left + window.scrollX}px`;
    this.tooltip.textContent = selector;
  }
  
  handleMouseOut() {
    if (!this.isInspecting) return;
    this.highlighter.style.display = 'none';
    this.tooltip.style.display = 'none';
  }

  handleClick(e) {
    if (!this.isInspecting) return;
    
    const target = e.target;
    if (target === this.toolbar || this.toolbar.contains(target)) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();

    const selector = this.getCssSelector(target);
    if (this.activeAttributeValueInput) {
      this.activeAttributeValueInput.value = selector;
      this.activeAttributeValueInput = null;
    } else {
      this.toolbar.querySelector('#css-selector').value = selector;
    }
    this.toggleInspector();
    
    // Auto-expand form when element is selected so user can see the populated content
    this.expandForm();
  }

  toggleEventForm() {
    const formContainer = this.toolbar.querySelector('.custom-event-form-container');
    const createEventBtn = this.toolbar.querySelector('#create-event-btn');
    const isVisible = !formContainer.classList.contains('collapsed');
    
    if (isVisible) {
      this.collapseForm();
    } else {
      this.expandForm();
      // Reset to first step when opening the form
      this.goToStep(1);
    }
    
    createEventBtn.classList.toggle('active', !isVisible);
  }

  addPathInput() {
    const pathsContainer = this.toolbar.querySelector('#paths-container');
    const newPathItem = document.createElement('div');
    newPathItem.className = 'path-item';
    newPathItem.innerHTML = `
      <input type="text" name="pathType[]" placeholder="Type" class="path-type" required>
      <input type="text" name="pathValue[]" placeholder="Value" class="path-value" required>
      <button type="button" class="remove-path-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    pathsContainer.appendChild(newPathItem);
  }

  removePathInput(button) {
    button.parentElement.remove();
  }

  addAttribute() {
    this.attributeCount++;
    const attributesContainer = this.toolbar.querySelector('#attributes-container');
    const addButton = this.toolbar.querySelector('#add-attribute-btn');
    
    const newAttribute = document.createElement('div');
    newAttribute.className = 'attribute-block';
    newAttribute.dataset.attributeId = this.attributeCount;
    
    newAttribute.innerHTML = `
      <div class="attribute-header">
        <h3 class="attribute-title">Attribute ${this.attributeCount} (Optional)</h3>
        <button type="button" class="remove-attribute-btn" title="Remove Attribute">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
      
      <div class="attribute-fields">
        <div class="attribute-name-field">
          <select name="attributeName[]" class="attribute-name-select">
            <option value="">Select Name</option>
            <option value="id">ID</option>
            <option value="class">Class</option>
            <option value="data-value">Data Value</option>
            <option value="text">Text Content</option>
            <option value="href">Link (href)</option>
            <option value="src">Image Source</option>
            <option value="alt">Alt Text</option>
            <option value="title">Title</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        
        <div class="attribute-value-field">
          <div class="input-with-icon">
            <input type="text" name="attributeValue[]" placeholder="Like &#34;#sale.price&#34;">
            <button type="button" class="inspect-attribute-btn toolbar-button icon-button" title="Inspect Element">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-crosshair"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Insert before the add button
    attributesContainer.insertBefore(newAttribute, addButton);
  }

  removeAttribute(attributeBlock) {
    // Don't remove if it's the last attribute
    const attributes = this.toolbar.querySelectorAll('.attribute-block');
    if (attributes.length <= 1) return;
    
    attributeBlock.remove();
    
    // Update the titles of the remaining attributes
    const remainingAttributes = this.toolbar.querySelectorAll('.attribute-block');
    remainingAttributes.forEach((attribute, index) => {
      const title = attribute.querySelector('.attribute-title');
      title.textContent = `Attribute ${index + 1} (Optional)`;
      attribute.dataset.attributeId = index + 1;
    });
    
    this.attributeCount = remainingAttributes.length;
  }
  
  markStepCompleted(stepNumber) {
    if (!this.completedSteps.includes(stepNumber)) {
      this.completedSteps.push(stepNumber);
    }
    
    // Update the step indicator UI to show completion
    const steps = this.toolbar.querySelectorAll('.stepper-step');
    const stepElement = steps[stepNumber - 1];
    
    if (stepElement) {
      stepElement.classList.add('completed');
      
      // Update the step number to a checkmark for completed steps
      const stepNumberElement = stepElement.querySelector('.step-number');
      if (stepNumberElement && !stepNumberElement.classList.contains('has-checkmark')) {
        stepNumberElement.classList.add('has-checkmark');
        stepNumberElement.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
      }
    }
  }
  
  isStepAccessible(stepNumber) {
    // First step is always accessible
    if (stepNumber === 1) return true;
    
    // For other steps, they're only accessible if previous steps are completed
    return this.completedSteps.includes(stepNumber - 1) || this.currentStep >= stepNumber;
  }
  
  addSelector() {
    this.selectorCount++;
    const selectorsContainer = this.toolbar.querySelector('#selectors-container');
    const addButton = this.toolbar.querySelector('#add-selector-btn');
    
    const newSelector = document.createElement('div');
    newSelector.className = 'selector-block';
    newSelector.dataset.selectorId = this.selectorCount;
    
    newSelector.innerHTML = `
      <div class="selector-header">
        <h3 class="selector-title">Selector ${this.selectorCount}</h3>
        <button type="button" class="remove-selector-btn" title="Remove Selector">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
      
      <div class="form-group-row">
        <label>Element Selector</label>
        <div class="input-with-icon">
          <input type="text" name="elementSelector[]" placeholder="Like &#34;#sale.addtocart&#34;" required>
          <button type="button" class="selector-inspect-btn toolbar-button icon-button" title="Inspect Element">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-crosshair"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
          </button>
        </div>
      </div>
      
      <div class="form-group-row">
        <label>Page Pattern (Optional)</label>
        <div class="page-pattern-container">
          <div class="pattern-operator">
            <select name="patternOperator[]" class="pattern-operator-select">
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="startsWith">Starts with</option>
              <option value="endsWith">Ends with</option>
              <option value="regex">Regex</option>
            </select>
          </div>
          <input type="text" name="patternValue[]" class="pattern-value" placeholder="Value">
        </div>
      </div>
    `;
    
    // Insert before the add button
    selectorsContainer.insertBefore(newSelector, addButton);
  }
  
  removeSelector(selectorBlock) {
    // Don't remove if it's the last selector
    const selectors = this.toolbar.querySelectorAll('.selector-block');
    if (selectors.length <= 1) return;
    
    selectorBlock.remove();
    
    // Update the titles of the remaining selectors
    const remainingSelectors = this.toolbar.querySelectorAll('.selector-block');
    remainingSelectors.forEach((selector, index) => {
      const title = selector.querySelector('.selector-title');
      title.textContent = `Selector ${index + 1}`;
      selector.dataset.selectorId = index + 1;
    });
    
    this.selectorCount = remainingSelectors.length;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      // Validate current step
      const isValid = this.validateStep(this.currentStep);
      if (!isValid) return;
      
      // Mark current step as completed
      this.markStepCompleted(this.currentStep);
      
      // Move to next step
      this.goToStep(this.currentStep + 1);
    } else {
      // On last step, submit form
      this.handleFormSubmit(new Event('submit'));
    }
  }
  
  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }
  
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    
    // Update buttons
    const prevStepBtn = this.toolbar.querySelector('#prev-step-btn');
    const nextStepBtn = this.toolbar.querySelector('#next-step-btn');
    
    prevStepBtn.disabled = stepNumber === 1;
    
    if (stepNumber === this.totalSteps) {
      nextStepBtn.innerHTML = `
        Save & Done
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17,21 17,13 7,13 7,21"></polyline>
          <polyline points="7,3 7,8 15,8"></polyline>
        </svg>
      `;
    } else {
      nextStepBtn.innerHTML = `
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;
    }
    
    // Update active step in UI
    const steps = this.toolbar.querySelectorAll('.stepper-step');
    const contents = this.toolbar.querySelectorAll('.step-content');
    
    steps.forEach(step => step.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    steps[stepNumber - 1].classList.add('active');
    contents[stepNumber - 1].classList.add('active');
    
    this.currentStep = stepNumber;
  }
  
  validateStep(step) {
    this.clearValidationErrors();
    let hasErrors = false;
    const stepContent = this.toolbar.querySelector(`.step-content[data-step="${step}"]`);
    
    if (step === 1) {
      // Validate Event Info fields
      const requiredFields = ['eventName', 'category', 'eventType', 'eventTrigger', 'countType'];
      requiredFields.forEach(fieldName => {
        const field = stepContent.querySelector(`[name="${fieldName}"]`);
        if (!field.value.trim()) {
          field.classList.add('error');
          hasErrors = true;
        }
      });
    } else if (step === 2) {
      // Validate Element Selectors - at least one must be valid
      const selectorInputs = stepContent.querySelectorAll('input[name="elementSelector[]"]');
      let hasValidSelector = false;
      
      for (const selectorInput of selectorInputs) {
        if (selectorInput.value.trim()) {
          hasValidSelector = true;
          selectorInput.classList.remove('error');
        } else {
          selectorInput.classList.add('error');
        }
      }
      
      if (!hasValidSelector) {
        hasErrors = true;
      }
    } else if (step === 3) {
      // Validate attributes - attributes are optional, so no validation errors
      // Just remove any existing error classes
      const attributeNameFields = stepContent.querySelectorAll('select[name="attributeName[]"]');
      const attributeValueFields = stepContent.querySelectorAll('input[name="attributeValue[]"]');
      
      attributeNameFields.forEach(field => field.classList.remove('error'));
      attributeValueFields.forEach(field => field.classList.remove('error'));
    }
    
    return !hasErrors;
  }
  
  closeEventForm() {
    this.currentStep = 1;
    this.collapseForm();
    this.toolbar.querySelector('#custom-event-form').reset();
    this.clearValidationErrors();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all steps
    for (let step = 1; step <= this.totalSteps; step++) {
      const isValid = this.validateStep(step);
      if (!isValid) {
        this.goToStep(step);
        return;
      }
    }
    
    const formData = new FormData(this.toolbar.querySelector('#custom-event-form'));
    const data = {
      eventName: formData.get('eventName'),
      category: formData.get('category'),
      eventType: formData.get('eventType'),
      eventTrigger: formData.get('eventTrigger'),
      countType: formData.get('countType'),
      selectors: []
    };
    
    // Get selectors data
    const elementSelectors = formData.getAll('elementSelector[]');
    const patternOperators = formData.getAll('patternOperator[]');
    const patternValues = formData.getAll('patternValue[]');
    
    for (let i = 0; i < elementSelectors.length; i++) {
      data.selectors.push({
        elementSelector: elementSelectors[i],
        pattern: {
          operator: patternOperators[i],
          value: patternValues[i]
        }
      });
    }
    
    // Get attributes
    const attributeNames = formData.getAll('attributeName[]');
    const attributeValues = formData.getAll('attributeValue[]');
    data.attributes = [];
    
    for (let i = 0; i < attributeNames.length; i++) {
      if (attributeNames[i] && attributeValues[i].trim()) {
        data.attributes.push({
          name: attributeNames[i],
          value: attributeValues[i]
        });
      }
    }
    
    this.showLoadingState();
    this.callApi(data);
  }

  showLoadingState() {
    const submitBtn = this.toolbar.querySelector('#custom-event-form button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Event...';
  }

  hideLoadingState() {
    const submitBtn = this.toolbar.querySelector('#custom-event-form button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create Event';
  }

  showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `api-message ${type}`;
    messageDiv.textContent = message;
    
    const form = this.toolbar.querySelector('#custom-event-form');
    form.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  async callApi(data) {
    try {
      const response = await fetch('/someapimock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      this.hideLoadingState();
      this.showMessage('Event created successfully!', 'success');
      this.toggleEventForm();
      this.toolbar.querySelector('#custom-event-form').reset();
      
    } catch (error) {
      this.hideLoadingState();
      this.showMessage(`Error creating event: ${error.message}`, 'error');
      console.error('API Error:', error);
    }
  }

  clearValidationErrors() {
    const form = this.toolbar.querySelector('#custom-event-form');
    form.querySelectorAll('.error').forEach(field => {
      field.classList.remove('error');
    });
  }

  validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  }

  getCssSelector(el) {
    let path = [], parent;
    while (parent = el.parentNode) {
        let tag = el.tagName, siblings;
        path.unshift(
            el.id ? `#${el.id}` : (
                siblings = parent.children,
                [].filter.call(siblings, (sibling) => sibling.tagName === tag).length === 1 ? tag.toLowerCase() :
                `${tag.toLowerCase()}:nth-child(${1 + [].indexOf.call(siblings, el)})`
            )
        );
        el = parent;
    }
    return `${path.join(' > ')}`.toLowerCase();
  }
  
  show() {
    if (!this.isVisible) {
      this.toolbar.style.display = 'block';
      setTimeout(() => {
        this.toolbar.style.transform = 'translateX(-50%) translateY(0)';
      }, 10);
      this.isVisible = true;
    }
    return this;
  }

  hide() {
    if (this.isVisible) {
      const translateY = this.options.position === 'top' ? '-100%' : '100%';
      this.toolbar.style.transform = `translateX(-50%) translateY(${translateY})`;
      setTimeout(() => {
        this.toolbar.style.display = 'none';
      }, 300);
      this.isVisible = false;
    }
    if (this.isInspecting) {
        this.toggleInspector();
    }
    return this;
  }

  toggle() {
    return this.isVisible ? this.hide() : this.show();
  }

  toggleCollapse() {
    const formContainer = this.toolbar.querySelector('.custom-event-form-container');
    const isCollapsed = formContainer.classList.contains('collapsed');
    
    if (isCollapsed) {
      this.expandForm();
    } else {
      this.collapseForm();
    }
  }

  collapseForm() {
    const formContainer = this.toolbar.querySelector('.custom-event-form-container');
    const collapseBtn = this.toolbar.querySelector('.inspector-toolbar-collapse');
    
    // Add collapsed class for smooth transition
    formContainer.classList.add('collapsed');
    
    // Update icon to show expand (down arrow)
    const icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"></polyline></svg>';
    collapseBtn.innerHTML = icon;
  }

  expandForm() {
    const formContainer = this.toolbar.querySelector('.custom-event-form-container');
    const collapseBtn = this.toolbar.querySelector('.inspector-toolbar-collapse');
    
    // Add expanded class for smooth transition
    formContainer.classList.remove('collapsed');
    
    // Update icon to show collapse (up arrow)
    const icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18,15 12,9 6,15"></polyline></svg>';
    collapseBtn.innerHTML = icon;
  }

  destroy() {
    if (this.toolbar && this.toolbar.parentNode) {
      this.toolbar.parentNode.removeChild(this.toolbar);
    }
    if (this.highlighter && this.highlighter.parentNode) {
        this.highlighter.parentNode.removeChild(this.highlighter);
    }
    if (this.tooltip && this.tooltip.parentNode) {
        this.tooltip.parentNode.removeChild(this.tooltip);
    }
    this.toolbar = null;
    this.highlighter = null;
    this.tooltip = null;
    this.isVisible = false;
    if (this.isInspecting) {
        this.stopInspecting();
    }
  }
}

export default InspectorToolbar;

if (typeof window !== 'undefined') {
  window.InspectorToolbar = InspectorToolbar;
}
