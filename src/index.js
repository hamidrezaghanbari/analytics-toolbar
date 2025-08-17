import './styles.css';

class InspectorToolbar {
  _getEvents() {
    const events = this.options.events;

    if (Array.isArray(events)) {
      return events;
    }

    return [];
  }

  constructor(options = {}) {
    this.options = {...(options || {})};
    
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
    this.categoriesData = null;
    this.rawCategoriesData = null;
    this.collapsed = true;
  }

  init() {
    this.createToolbar();
    this.attachToPage();
    this.createInspectorElements();
    this.showConstantEvents();
    this.fetchCategories();
    return this;
  }

  createToolbar() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'inspector-toolbar';
    this.toolbar.innerHTML = `
      <div class="inspector-toolbar-content">
        <div class="toolbar-left">
          <div class="toolbar-logo">
            Event Builder
          </div>
        </div>
        <div class="toolbar-right">
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
                
                <div class="form-group-row-split">
                  <div class="form-group-half">
                    <label for="event-category">Custom Category</label>
                    <select id="event-category" name="category" required>
                      <option value="">Loading...</option>
                    </select>
                  </div>
                  <div class="form-group-half">
                    <label for="event-type">Event</label>
                    <select id="event-type" name="eventType" required>
                      <option value="">Please select a category</option>
                    </select>
                  </div>
                </div>
                
                <div class="form-group-row-split">
                  <div class="form-group-half">
                    <label for="event-trigger">Event Trigger</label>
                    <select id="event-trigger" name="eventTrigger" required>
                      <option value="click"> Click</option>
                      <option value="pageview">Page View</option>
                      <option value="form_submit"> Submit</option>
                      <option value="visibility_change">Visible on screen</option>
                    </select>
                  </div>
                  <div class="form-group-half">
                    <label for="count-type">Count Type</label>
                    <select id="count-type" name="countType" required>
                      <option value="per_event">Per Event</option>
                      <option value="once_per_session">Once per session</option>
                      <option value="once_per_page">Once per page</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- Step 2: Selectors -->
              <div class="step-content" data-step="2">
                <div id="selectors-container">
                  <!-- Selector 1 -->
                  <div class="selector-block" data-selector-id="1">
                    <div class="selector-header">
                      <h3 class="selector-title">Selector 1</h3>
                      <button type="button" class="remove-selector-btn remove-selector-btn-hide" title="Remove Selector">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
                          <select name="patternOperator[]" class="pattern-operator-select border-none">
                            <option value="equals">Equals</option>
                            <option value="contains">Contains</option>
                            <option value="starts_with">Starts with</option>
                            <option value="ends_with">Ends with</option>
                          </select>
                        </div>
                        <input type="text" name="patternValue[]" class="pattern-value border-none" placeholder="Value">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Add Selector Button -->
                  <button type="button" id="add-selector-btn" class="add-selector-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add New
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
                      <button type="button" class="remove-attribute-btn remove-attribute-btn-hide" title="Remove Attribute">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
              <button type="button" id="prev-step-btn" class="secondary-btn">
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
    Object.assign(this.toolbar.style, {
      position: 'fixed',
      left: '50%',
      height: this.options.height,
      backgroundColor: this.options.backgroundColor,
      color: this.options.textColor,
      zIndex: '9999',
      transform: 'translateX(-50%)',
    });
  }

  bindEvents() {
    const collapseBtn = this.toolbar.querySelector('.inspector-toolbar-collapse');
    collapseBtn.addEventListener('click', () => this.toggleCollapse());

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
    
    nextStepBtn.addEventListener('click', () => this.nextStep());
    prevStepBtn.addEventListener('click', () => this.prevStep());

    this.goToStep(1);
    
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
    
    // Clear errors when user starts typing
    form.addEventListener('input', (e) => {
      if (e.target.classList.contains('error')) {
        this.clearFieldError(e.target);
      }
    });
    
    // Also clear errors on change for select elements
    form.addEventListener('change', (e) => {
      if (e.target.tagName === 'SELECT' && e.target.classList.contains('error')) {
        this.clearFieldError(e.target);
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

    this.toolbar.querySelector('#attributes-container').addEventListener('change', (e) => {
      if (e.target.matches('[name="attributeName[]"]')) {
        const categorySelect = this.toolbar.querySelector('#event-category');
        const productTypeSelect = this.toolbar.querySelector('#event-type');
        this.updateAttributes(categorySelect.value, productTypeSelect.value);
      }
    });
    
    this.boundHandleMouseOver = this.handleMouseOver.bind(this);
    this.boundHandleMouseOut = this.handleMouseOut.bind(this);
    this.boundHandleClick = this.handleClick.bind(this);

    const categorySelect = this.toolbar.querySelector('#event-category');
    categorySelect.addEventListener('change', (e) => this.updateProductTypes(e.target.value));

    const productTypeSelect = this.toolbar.querySelector('#event-type');
    productTypeSelect.addEventListener('change', (e) => {
      const category = categorySelect.value;
      const productType = e.target.value;
      this.updateAttributes(category, productType);
    });
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

  showEvent(event) {
    if (!event || !event.cssSelector) {
      console.error('Event with a cssSelector is required.');
      return;
    }
  
    const target = document.querySelector(event.cssSelector);
    if (!target) {
      console.error(`Element with selector "${event.cssSelector}" not found.`);
      return;
    }
  
    const rect = target.getBoundingClientRect();
  
    const highlighter = document.createElement('div');
    highlighter.className = 'constant-event-highlighter';
    document.body.appendChild(highlighter);
  
    const tooltip = document.createElement('div');
    tooltip.className = 'constant-event-tooltip';
    document.body.appendChild(tooltip);

    highlighter.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Event clicked:', event);
    });
  
    Object.assign(highlighter.style, {
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  
    Object.assign(tooltip.style, {
      top: `${rect.top + window.scrollY - 10}px`,
      left: `${rect.left + window.scrollX}px`,
      transform: 'translateY(-100%)',
    });
  
    tooltip.innerHTML = `
      <div class="tooltip-event-name">${event.eventName || 'Event'}</div>
    `;
  }
  
  showConstantEvents() {
    const events = this._getEvents();
    events.forEach(event => this.showEvent(event));
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
    
    // Repopulate attributes for the new select dropdown
    const categorySelect = this.toolbar.querySelector('#event-category');
    const productTypeSelect = this.toolbar.querySelector('#event-type');
    this.updateAttributes(categorySelect.value, productTypeSelect.value);
    
    this.updateRemoveAttributeButtons();
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
    this.updateRemoveAttributeButtons();
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
            <select name="patternOperator[]" class="pattern-operator-select border-none">
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="starts_with">Starts with</option>
              <option value="ends_with">Ends with</option>
            </select>
          </div>
          <input type="text" name="patternValue[]" class="pattern-value border-none" placeholder="Value">
        </div>
      </div>
    `;
    
    // Insert before the add button
    selectorsContainer.insertBefore(newSelector, addButton);

    this.updateRemoveSelectorButtons();
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
    
    this.updateRemoveSelectorButtons();
  }

  updateRemoveSelectorButtons() {
    const selectors = this.toolbar.querySelectorAll('.selector-block');
    selectors.forEach((selector, index) => {
      const removeBtn = selector.querySelector('.remove-selector-btn');
      if (selectors.length > 1) {
        removeBtn.classList.remove('remove-selector-btn-hide');
      } else {
        removeBtn.classList.add('remove-selector-btn-hide');
      }
    });
  }

  updateRemoveAttributeButtons() {
    const attributes = this.toolbar.querySelectorAll('.attribute-block');
    attributes.forEach((attribute, index) => {
      const removeBtn = attribute.querySelector('.remove-attribute-btn');
      if (attributes.length > 1) {
        removeBtn.classList.remove('remove-attribute-btn-hide');
      } else {
        removeBtn.classList.add('remove-attribute-btn-hide');
      }
    });
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
    if (this.currentStep === 1) {
      // On step 1, Cancel button collapses the toolbar
      this.toggleCollapse();
    } else if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }
  
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    
    // Update buttons
    const prevStepBtn = this.toolbar.querySelector('#prev-step-btn');
    const nextStepBtn = this.toolbar.querySelector('#next-step-btn');
    
    // Don't disable on step 1 since it acts as Cancel button
    prevStepBtn.disabled = false;
    
    if (stepNumber === 1) {
      prevStepBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        Cancel
      `;
    } else {
      prevStepBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Previous
      `;
    }

     if (stepNumber === this.totalSteps) {
       nextStepBtn.innerHTML = `
         <span id="submit-btn">
         Save & Done
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
           <polyline points="17,21 17,13 7,13 7,21"></polyline>
           <polyline points="7,3 7,8 15,8"></polyline>
         </svg>
         </span>
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
      const validationRules = {
        eventName: 'Event name is required',
        category: 'Category is required',
        eventType: 'Event type is required', 
        eventTrigger: 'Event trigger is required',
        countType: 'Count type is required'
      };
      
      Object.entries(validationRules).forEach(([fieldName, errorMessage]) => {
        const field = stepContent.querySelector(`[name="${fieldName}"]`);
        if (!field.value.trim()) {
          this.showFieldError(field, errorMessage);
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
        }
      }
      
      if (!hasValidSelector) {
        hasErrors = true;
        // Mark first selector as error
        if (selectorInputs.length > 0) {
          this.showFieldError(selectorInputs[0], 'At least one element selector is required');
        }
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
  
  showFieldError(field, message) {
    field.classList.add('error');
    
    // For element selector inputs, place error below the input-with-icon container
    let errorContainer = field.parentElement;
    if (field.name === 'elementSelector[]' && field.parentElement.classList.contains('input-with-icon')) {
      errorContainer = field.parentElement.parentElement; // Use the form-group-row
    }
    
    // Check if error message already exists
    let errorElement = errorContainer.querySelector('.field-error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error-message';
      errorContainer.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }
  
  clearFieldError(field) {
    field.classList.remove('error');
    
    // For element selector inputs, look for error in the form-group-row
    let errorContainer = field.parentElement;
    if (field.name === 'elementSelector[]' && field.parentElement.classList.contains('input-with-icon')) {
      errorContainer = field.parentElement.parentElement;
    }
    
    const errorElement = errorContainer.querySelector('.field-error-message');
    if (errorElement) {
      errorElement.remove();
    }
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
    const activeTypeButton = this.toolbar.querySelector('.type-option.active');
    const data = {
      type: activeTypeButton ? activeTypeButton.dataset.type : 'key',
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
    const submitBtn = this.toolbar.querySelector('#submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Event...';
  }

  hideLoadingState() {
    const submitBtn = this.toolbar.querySelector('#submit-btn');
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
    const urlParams = new URLSearchParams(window.location.search);
    let apiUrl;
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      apiUrl = 'http://87.247.186.146:8001/api/v1/';
    } else {
      apiUrl = urlParams.get('api_url');
    }
    const token = urlParams.get('token');

    const selector = (data?.selectors?.map(selector => selector?.elementSelector) || [])?.join(', ')

    let attributes = {}

    data?.attributes?.forEach(attribute => {
      attributes[attribute?.name] = {
        type: 'css_selector',
        value: attribute?.value,
        value_type: this.categoriesData?.[data?.category]?.[data?.eventType]?.[attribute?.name]?.value_type || 'varchar'
       }
    })

    const payload = {
      attributes,
      "count_method": data?.countType,
      category: data.type === 'general' ? 'default' : 'goal',
      "custom_category": data?.category,
      "domain": window.location.hostname,
      "event_type": data?.eventTrigger,
      "name": data?.eventName,
      "product_type": data?.eventType,
      "type": "event",
      page_url: data?.selectors?.map(selector => {
        return {
          "operator": selector?.pattern?.operator,
          "url": selector?.pattern?.value
        }
      }) || [],
      "selector": {
        "type": "css_selector",
        "value": selector,
      },
    }  

    if (!apiUrl) {
      console.log('No api_url found in search params, skipping API call.');
      this.hideLoadingState();
      this.showMessage('API URL not provided.', 'error');
      return;
    }
    
    try {
      const createEventUrl = apiUrl + `goals/site/domain/${window.location.hostname}`
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(createEventUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers
      });

      if (!response.ok) {
        console.log('error on creating event', response)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result, apiUrl, getStructureApiUrl, 'result here')


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
    
    // Remove all field error messages
    form.querySelectorAll('.field-error-message').forEach(errorMsg => {
      errorMsg.remove();
    });
    
    // Remove all step error containers
    form.querySelectorAll('.step-error-container').forEach(errorContainer => {
      errorContainer.remove();
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
    this.toolbar.classList.add('collapsed');
    this.collapsed = true;
    
    // Update icon to show expand (down arrow)
    const icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"></polyline></svg>';
    collapseBtn.innerHTML = icon;
  }

  expandForm() {
    const formContainer = this.toolbar.querySelector('.custom-event-form-container');
    const collapseBtn = this.toolbar.querySelector('.inspector-toolbar-collapse');
    
    // Add expanded class for smooth transition
    formContainer.classList.remove('collapsed');
    this.toolbar.classList.remove('collapsed');
    this.collapsed = false;
    
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

  async fetchCategories() {
    const urlParams = new URLSearchParams(window?.location?.search||'');
    let apiUrl;
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      apiUrl = 'http://87.247.186.146:8001/api/v1/';
    } else {
      apiUrl = urlParams.get('api_url');
    }
    const token = urlParams.get('token');

    const url = `${apiUrl}analytics/categories/structure`

    try {

      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(url, { headers });

      const result = await response.json();

      console.log(result, 'respone')

      const categoriesData = Object.entries(result).map(([key, value]) => {
        const productTypes = Object.keys(value || {}) || []

        return {
          category: key,
          product_types: productTypes
        }
      })

      if (!response.ok) {
        console.log(`Error on getting categories, event, attributes: HTTP error! status: ${response.status}`);
      }

      this.categoriesData = categoriesData || []
      this.rawCategoriesData = result || null
      this.populateCategories();
    } catch (error) {
      console.error("Could not fetch categories:", error);
      const categorySelect = this.toolbar.querySelector('#event-category');
      categorySelect.innerHTML = '<option value="">Error loading</option>';
    }
  }

  populateCategories() {
    const categorySelect = this.toolbar.querySelector('#event-category');
    console.log(this.categoriesData, 'categories')
    if (!this.categoriesData) return;

    categorySelect.innerHTML = '<option value="">Select a category</option>';

    this.categoriesData.forEach(category => {
      const option = document.createElement('option');
      option.value = category.category;
      option.textContent = category.category.charAt(0).toUpperCase() + category.category.slice(1);
      categorySelect.appendChild(option);
    })
  }

  updateProductTypes(selectedCategory) {
    const productTypeSelect = this.toolbar.querySelector('#event-type');
    const attributeSelects = this.toolbar.querySelectorAll('[name="attributeName[]"]');
    
    productTypeSelect.innerHTML = ''; // Clear existing options
    attributeSelects.forEach(s => s.innerHTML = '');

    const categoryData = this.categoriesData.find(c => c.category === selectedCategory);

    if (categoryData && categoryData.product_types) {
      productTypeSelect.innerHTML = '<option value="">Select a product type</option>';
      categoryData.product_types.forEach(productType => {
        const option = document.createElement('option');
        option.value = productType;
        option.textContent = productType.charAt(0).toUpperCase() + productType.slice(1);
        productTypeSelect.appendChild(option);
      });
    } else {
      productTypeSelect.innerHTML = '<option value="">Please select a category first</option>';
      attributeSelects.forEach(s => s.innerHTML = '<option value="">Please select a category first</option>');
    }
  }

  updateAttributes(selectedCategory, selectedProductType) {
    const attributeSelects = this.toolbar.querySelectorAll('[name="attributeName[]"]');
    const allAttributes = Object.keys(this.rawCategoriesData?.[selectedCategory]?.[selectedProductType] || {});

    const selectedValues = Array.from(attributeSelects)
      .map(select => select.value)
      .filter(value => value !== '');

    attributeSelects.forEach(attributeSelect => {
      const currentValue = attributeSelect.value;
      attributeSelect.innerHTML = '<option value="">Select an attribute</option>';
      
      const availableAttributes = allAttributes.filter(attr => {
        return !selectedValues.includes(attr) || attr === currentValue;
      });

      availableAttributes.forEach(attr => {
        const option = document.createElement('option');
        option.value = attr;
        option.textContent = attr.charAt(0).toUpperCase() + attr.slice(1);
        attributeSelect.appendChild(option);
      });

      attributeSelect.value = currentValue;
    });
  }
}

export default InspectorToolbar;

if (typeof window !== 'undefined') {
  window.InspectorToolbar = InspectorToolbar;
}
