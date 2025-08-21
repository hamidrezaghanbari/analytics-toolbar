import { getShadowStyles } from './shadow-styles.js';

class InspectorToolbar {
  _getEvents() {
    const events = this.options.events;
    if (Array.isArray(events)) {
      return events;
    }
    return [];
  }

  constructor(options = {}) {
    this.options = {
      apiUrl: null,
      token: null,
      debug: false,
      debugEvent: null,
      position: 'bottom',
      height: '60px',
      backgroundColor: '#ffffff',
      textColor: '#1e293b',
      ...options
    };
    
    this.toolbarHost = null;
    this.shadowRoot = null;
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
    this.debugElements = [];
  }

  init() {
    this.createToolbarHost();
    this.createToolbar();
    this.attachToPage();
    this.createInspectorElements();
    this.showConstantEvents();
    this.fetchCategories();
    
    // Handle debug mode
    if (this.options.debug && this.options.debugEvent) {
      this.showDebugElement(this.options.debugEvent);
    }
    
    // Listen for WEBANALYTICS_API_CALL custom event when debug is enabled
    if (this.options.debug) {
      this.listenForWebAnalyticsEvents();
    }
    
    return this;
  }

  createToolbarHost() {
    // Create a host element for the Shadow DOM
    this.toolbarHost = document.createElement('div');
    this.toolbarHost.id = 'inspector-toolbar-host';
    this.toolbarHost.style.cssText = `
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 50px;
      z-index: 9999;
      pointer-events: auto;
    `;
    
    // Create Shadow DOM
    this.shadowRoot = this.toolbarHost.attachShadow({ mode: 'open' });
  }

  createToolbar() {
    // Inject styles into Shadow DOM
    const styleSheet = document.createElement('style');
    styleSheet.textContent = getShadowStyles();
    this.shadowRoot.appendChild(styleSheet);

    // Create toolbar structure inside Shadow DOM
    const toolbarWrapper = document.createElement('div');
    toolbarWrapper.className = 'inspector-toolbar-wrapper collapsed';
    toolbarWrapper.innerHTML = `
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
                
               
                <div class="form-group-row-split">
                  <div class="form-group-half">
                    <label for="event-category">Category</label>
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
          </div>
        </form>

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
    `;

    this.shadowRoot.appendChild(toolbarWrapper);
    this.toolbar = toolbarWrapper;
    
    this.bindEvents();
  }

  // Helper method to query elements in Shadow DOM
  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  $$(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  createInspectorElements() {
    // These elements need to be in the main DOM for inspection
    this.highlighter = document.createElement('div');
    this.highlighter.style.cssText = `
      position: absolute;
      background-color: rgba(59, 130, 246, 0.15);
      border: 2px solid #3b82f6;
      border-radius: 4px;
      z-index: 9998;
      display: none;
      pointer-events: none;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1);
    `;
    document.body.appendChild(this.highlighter);

    this.tooltip = document.createElement('div');
    this.tooltip.style.cssText = `
      position: absolute;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #475569;
      z-index: 9999999;
      display: none;
      font-size: 10px;
      pointer-events: none;
      font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
    `;
    document.body.appendChild(this.tooltip);
  }

  bindEvents() {
    const collapseBtn = this.$('.inspector-toolbar-collapse');
    collapseBtn.addEventListener('click', () => this.toggleCollapse());
    
    // Add keyboard navigation support
    this.setupKeyboardNavigation();

    const addAttributeBtn = this.$('#add-attribute-btn');
    addAttributeBtn.addEventListener('click', () => this.addAttribute());
    
    // Add Selector button
    const addSelectorBtn = this.$('#add-selector-btn');
    addSelectorBtn.addEventListener('click', () => this.addSelector());
    
    // Stepper navigation
    const nextStepBtn = this.$('#next-step-btn');
    const prevStepBtn = this.$('#prev-step-btn');
    
    nextStepBtn.addEventListener('click', () => this.nextStep());
    prevStepBtn.addEventListener('click', () => this.prevStep());
    
    // Handle event trigger changes to update step indicators
    const eventTriggerSelect = this.$('#event-trigger');
    if (eventTriggerSelect) {
      eventTriggerSelect.addEventListener('change', () => {
        this.updateStepperForEventTrigger();
      });
    }

    this.goToStep(1);
    
    // Type selector buttons
    const typeOptions = this.$$('.type-option');
    typeOptions.forEach(option => {
      option.addEventListener('click', () => {
        typeOptions.forEach(btn => btn.classList.remove('active'));
        option.classList.add('active');
      });
    });

    const form = this.$('#custom-event-form');
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
    
    // Event delegation for dynamic elements
    this.shadowRoot.addEventListener('click', (e) => {
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
        
        // Don't allow direct navigation to step 2 if pageview is selected
        const eventTrigger = this.$('#event-trigger')?.value;
        if (stepNumber === 2 && eventTrigger === 'pageview') {
          return; // Skip step 2 for pageview
        }
        
        if (!stepElement.classList.contains('active') && this.isStepAccessible(stepNumber)) {
          this.goToStep(stepNumber);
        }
      }
    });

    this.$('#attributes-container').addEventListener('change', (e) => {
      if (e.target.matches('[name="attributeName[]"]')) {
        const categorySelect = this.$('#event-category');
        const productTypeSelect = this.$('#event-type');
        this.updateAttributes(categorySelect.value, productTypeSelect.value);
      }
    });
    
    this.boundHandleMouseOver = this.handleMouseOver.bind(this);
    this.boundHandleMouseOut = this.handleMouseOut.bind(this);
    this.boundHandleClick = this.handleClick.bind(this);

    const categorySelect = this.$('#event-category');
    categorySelect.addEventListener('change', (e) => this.updateProductTypes(e.target.value));

    const productTypeSelect = this.$('#event-type');
    productTypeSelect.addEventListener('change', (e) => {
      const category = categorySelect.value;
      const productType = e.target.value;
      this.updateAttributes(category, productType);
    });
  }

  attachToPage() {
    document.body.appendChild(this.toolbarHost);
  }

  toggleInspector() {
    this.isInspecting = !this.isInspecting;
    if (this.isInspecting) {
      this.startInspecting();
      this.collapseForm();
    } else {
      this.stopInspecting();
    }
  }

  startInspecting() {
    document.body.style.cursor = 'crosshair';
    const inspectButtons = this.$$('.selector-inspect-btn, .inspect-attribute-btn');
    inspectButtons.forEach(btn => btn.classList.add('active'));
    document.addEventListener('mouseover', this.boundHandleMouseOver);
    document.addEventListener('mouseout', this.boundHandleMouseOut);
    document.addEventListener('click', this.boundHandleClick, true);
  }

  stopInspecting() {
    document.body.style.cursor = 'default';
    const inspectButtons = this.$$('.selector-inspect-btn, .inspect-attribute-btn');
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
    
    // Check if hovering over our toolbar or inspector elements
    if (this.toolbarHost.contains(target) || target === this.highlighter || target === this.tooltip) {
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
    if (this.toolbarHost.contains(target)) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();

    const selector = this.getCssSelector(target);
    if (this.activeAttributeValueInput) {
      this.activeAttributeValueInput.value = selector;
      this.activeAttributeValueInput = null;
    }
    this.toggleInspector();
    this.expandForm();
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
    highlighter.style.cssText = `
      position: absolute;
      box-sizing: border-box;
      border: 2px solid #3b82f6;
      border-radius: 4px;
      background-color: rgba(59, 130, 246, 0.2);
      z-index: 9998;
      pointer-events: all;
      cursor: pointer;
      animation: pulse-blue 2s infinite;
      top: ${rect.top + window.scrollY}px;
      left: ${rect.left + window.scrollX}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
    `;
    document.body.appendChild(highlighter);
  
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
      position: absolute;
      z-index: 9999;
      pointer-events: none;
      background-color: #3b82f6;
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      top: ${rect.top + window.scrollY - 40}px;
      left: ${rect.left + window.scrollX}px;
    `;
    tooltip.textContent = event.eventType || 'Event';
    document.body.appendChild(tooltip);

    highlighter.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('[INSPECTOR-TOOLBAR] Event clicked:', event);
    });
  }
  
  showConstantEvents() {
    const events = this._getEvents();
    events.forEach(event => this.showEvent(event));
  }

  // All other methods remain the same, but use this.$ and this.$$ for Shadow DOM queries
  toggleCollapse() {
    const formContainer = this.$('.custom-event-form-container');
    const isCollapsed = formContainer.classList.contains('collapsed');
    
    if (isCollapsed) {
      this.expandForm();
    } else {
      this.collapseForm();
    }
  }

  collapseForm() {
    const formContainer = this.$('.custom-event-form-container');
    const collapseBtn = this.$('.inspector-toolbar-collapse');
    
    formContainer.classList.add('collapsed');
    this.toolbar.classList.add('collapsed');
    this.collapsed = true;
    
    const icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,15 18,9"></polyline></svg>';
    collapseBtn.innerHTML = icon;
  }

  expandForm() {
    const formContainer = this.$('.custom-event-form-container');
    const collapseBtn = this.$('.inspector-toolbar-collapse');
    
    formContainer.classList.remove('collapsed');
    this.toolbar.classList.remove('collapsed');
    this.collapsed = false;
    
    const icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18,15 12,9 6,15"></polyline></svg>';
    collapseBtn.innerHTML = icon;
  }

  addAttribute() {
    this.attributeCount++;
    const attributesContainer = this.$('#attributes-container');
    const addButton = this.$('#add-attribute-btn');
    
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
    
    attributesContainer.insertBefore(newAttribute, addButton);
    
    const categorySelect = this.$('#event-category');
    const productTypeSelect = this.$('#event-type');
    this.updateAttributes(categorySelect.value, productTypeSelect.value);
    
    this.updateRemoveAttributeButtons();
  }

  removeAttribute(attributeBlock) {
    const attributes = this.$$('.attribute-block');
    if (attributes.length <= 1) return;
    
    attributeBlock.remove();
    
    const remainingAttributes = this.$$('.attribute-block');
    remainingAttributes.forEach((attribute, index) => {
      const title = attribute.querySelector('.attribute-title');
      title.textContent = `Attribute ${index + 1} (Optional)`;
      attribute.dataset.attributeId = index + 1;
    });
    
    this.attributeCount = remainingAttributes.length;
    this.updateRemoveAttributeButtons();
  }

  addSelector() {
    this.selectorCount++;
    const selectorsContainer = this.$('#selectors-container');
    const addButton = this.$('#add-selector-btn');
    
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
    
    selectorsContainer.insertBefore(newSelector, addButton);
    this.updateRemoveSelectorButtons();
  }
  
  removeSelector(selectorBlock) {
    const selectors = this.$$('.selector-block');
    if (selectors.length <= 1) return;
    
    selectorBlock.remove();
    
    const remainingSelectors = this.$$('.selector-block');
    remainingSelectors.forEach((selector, index) => {
      const title = selector.querySelector('.selector-title');
      title.textContent = `Selector ${index + 1}`;
      selector.dataset.selectorId = index + 1;
    });
    
    this.selectorCount = remainingSelectors.length;
    this.updateRemoveSelectorButtons();
  }

  updateRemoveSelectorButtons() {
    const selectors = this.$$('.selector-block');
    selectors.forEach((selector) => {
      const removeBtn = selector.querySelector('.remove-selector-btn');
      if (selectors.length > 1) {
        removeBtn.classList.remove('remove-selector-btn-hide');
      } else {
        removeBtn.classList.add('remove-selector-btn-hide');
      }
    });
  }

  updateRemoveAttributeButtons() {
    const attributes = this.$$('.attribute-block');
    attributes.forEach((attribute) => {
      const removeBtn = attribute.querySelector('.remove-attribute-btn');
      if (attributes.length > 1) {
        removeBtn.classList.remove('remove-attribute-btn-hide');
      } else {
        removeBtn.classList.add('remove-attribute-btn-hide');
      }
    });
  }

  // Continue with remaining methods...
  // [All other methods remain the same but use this.$ and this.$$ for Shadow DOM queries]
  
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      const isValid = this.validateStep(this.currentStep);
      if (!isValid) return;
      
      this.markStepCompleted(this.currentStep);
      
      // Skip step 2 (Selectors) if Page View is selected
      let nextStepNumber = this.currentStep + 1;
      if (this.currentStep === 1) {
        const eventTrigger = this.$('#event-trigger')?.value;
        if (eventTrigger === 'pageview' && nextStepNumber === 2) {
          // Mark step 2 as completed and skip to step 3
          this.markStepCompleted(2);
          nextStepNumber = 3;
        }
      }
      
      this.goToStep(nextStepNumber);
    } else {
      this.handleFormSubmit(new Event('submit'));
    }
  }
  
  prevStep() {
    if (this.currentStep === 1) {
      this.toggleCollapse();
    } else if (this.currentStep > 1) {
      // Skip step 2 (Selectors) when going back if Page View is selected
      let prevStepNumber = this.currentStep - 1;
      if (this.currentStep === 3) {
        const eventTrigger = this.$('#event-trigger')?.value;
        if (eventTrigger === 'pageview' && prevStepNumber === 2) {
          prevStepNumber = 1;
        }
      }
      this.goToStep(prevStepNumber);
    }
  }
  
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    
    const prevStepBtn = this.$('#prev-step-btn');
    const nextStepBtn = this.$('#next-step-btn');
    
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
   
    const steps = this.$$('.stepper-step');
    const contents = this.$$('.step-content');
    
    steps.forEach(step => step.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    steps[stepNumber - 1].classList.add('active');
    contents[stepNumber - 1].classList.add('active');
    
    // Restore checkmarks for all completed steps
    steps.forEach((stepElement, index) => {
      const currentStepNum = index + 1;
      if (this.completedSteps.includes(currentStepNum)) {
        stepElement.classList.add('completed');
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
    });
    
    this.currentStep = stepNumber;
  }

  markStepCompleted(stepNumber) {
    if (!this.completedSteps.includes(stepNumber)) {
      this.completedSteps.push(stepNumber);
    }
    
    const steps = this.$$('.stepper-step');
    const stepElement = steps[stepNumber - 1];
    
    if (stepElement) {
      stepElement.classList.add('completed');
      
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
    if (stepNumber === 1) return true;
    return this.completedSteps.includes(stepNumber - 1) || this.currentStep >= stepNumber;
  }

  updateStepperForEventTrigger() {
    const eventTrigger = this.$('#event-trigger')?.value;
    const step2Element = this.$('.stepper-step[data-step="2"]');
    const step2Label = step2Element?.querySelector('.step-label');
    
    if (eventTrigger === 'pageview') {
      // Visually indicate step 2 will be skipped
      if (step2Element) {
        step2Element.classList.add('will-skip');
        if (step2Label) {
          step2Label.textContent = 'Selectors (Skipped)';
        }
      }
    } else {
      // Reset to normal state
      if (step2Element) {
        step2Element.classList.remove('will-skip');
        if (step2Label) {
          step2Label.textContent = 'Selectors';
        }
      }
    }
  }

  validateStep(step) {
    this.clearValidationErrors();
    let hasErrors = false;
    const stepContent = this.$(`.step-content[data-step="${step}"]`);
    
    if (step === 1) {
      const validationRules = {
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
      // Skip validation for step 2 if pageview is selected
      const eventTrigger = this.$('#event-trigger')?.value;
      if (eventTrigger === 'pageview') {
        return true; // Skip validation for pageview
      }
      
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
        if (selectorInputs.length > 0) {
          this.showFieldError(selectorInputs[0], 'At least one element selector is required');
        }
      }
    }
    
    return !hasErrors;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    let errorContainer = field.parentElement;
    if (field.name === 'elementSelector[]' && field.parentElement.classList.contains('input-with-icon')) {
      errorContainer = field.parentElement.parentElement;
    }
    
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
    
    let errorContainer = field.parentElement;
    if (field.name === 'elementSelector[]' && field.parentElement.classList.contains('input-with-icon')) {
      errorContainer = field.parentElement.parentElement;
    }
    
    const errorElement = errorContainer.querySelector('.field-error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  clearValidationErrors() {
    const form = this.$('#custom-event-form');
    form.querySelectorAll('.error').forEach(field => {
      field.classList.remove('error');
    });
    
    form.querySelectorAll('.field-error-message').forEach(errorMsg => {
      errorMsg.remove();
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    
    for (let step = 1; step <= this.totalSteps; step++) {
      const isValid = this.validateStep(step);
      if (!isValid) {
        this.goToStep(step);
        return;
      }
    }
    
    const formData = new FormData(this.$('#custom-event-form'));
    const activeTypeButton = this.$('.type-option.active');
    const data = {
      type: activeTypeButton ? activeTypeButton.dataset.type : 'key',
      category: formData.get('category'),
      eventType: formData.get('eventType'),
      eventTrigger: formData.get('eventTrigger'),
      countType: formData.get('countType'),
      selectors: []
    };
    
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
    const submitBtn = this.$('#submit-btn');
    if (!submitBtn) return;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Creating Event...
    `;
  }

  hideLoadingState() {
    const submitBtn = this.$('#next-step-btn');
    if (!submitBtn) return;
    
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <span id="submit-btn">
      Save & Done
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17,21 17,13 7,13 7,21"></polyline>
        <polyline points="7,3 7,8 15,8"></polyline>
      </svg>
      </span>
    `;
  }

  showDebugElement(debugEvent) {
    const { name, selector, trigger } = debugEvent;
    
    // If trigger is pageview, select the whole page
    let element;
    if (trigger === 'pageview') {
      element = document.body; // Select the whole page
    } else {
      if (!selector) {
        console.error('[INSPECTOR-TOOLBAR] Debug event must have a selector');
        return;
      }
      
      element = document.querySelector(selector);
      
      if (!element) {
        // Show permanent toast on top left if element not found
        this.showPermanentToast(`Element not found: "${selector}"`, name);
        return;
      }
    }
    
    // Get element position
    const rect = element.getBoundingClientRect();
    
    // Create debug border
    const debugBorder = document.createElement('div');
    debugBorder.className = 'inspector-debug-border';
    debugBorder.style.cssText = `
      position: absolute;
      top: ${rect.top + window.scrollY}px;
      left: ${rect.left + window.scrollX}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      border: 2px solid #2563eb;
      background: rgba(37, 99, 235, 0.08);
      pointer-events: none;
      z-index: 9997;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1), inset 0 0 20px rgba(37, 99, 235, 0.05);
      border-radius: 4px;
      animation: debugPulse 2s ease-in-out infinite;
    `;
    document.body.appendChild(debugBorder);
    
    // Add animation styles if not present
    if (!document.getElementById('inspector-debug-styles')) {
      const style = document.createElement('style');
      style.id = 'inspector-debug-styles';
      style.textContent = `
        @keyframes debugPulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1), inset 0 0 20px rgba(37, 99, 235, 0.05);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.15), inset 0 0 25px rgba(37, 99, 235, 0.08);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Create debug toolbar - positioned higher above the element
    const debugToolbar = document.createElement('div');
    debugToolbar.className = 'inspector-debug-toolbar';
    const toolbarOffset = Math.min(rect.top, 60); // Ensure toolbar fits on screen
    debugToolbar.style.cssText = `
      position: absolute;
      top: ${rect.top + window.scrollY - toolbarOffset}px;
      left: ${rect.left + window.scrollX}px;
      min-width: 200px;
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
      z-index: 9998;
      box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
    `;
    
    debugToolbar.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path>
      </svg>
      <div style="display: flex; flex-direction: column; gap: 2px;">
        <div style="font-weight: 600; font-size: 13px; letter-spacing: 0.3px;">${name || 'Debug Event'}</div>
        <div style="opacity: 0.85; font-size: 11px; text-transform: capitalize;">
          <span style="opacity: 0.7;">Trigger:</span> ${trigger || 'unknown'}
        </div>
      </div>
    `;
    
    document.body.appendChild(debugToolbar);
    
    // Store references for cleanup
    this.debugElements.push(debugBorder, debugToolbar);
    
    // Update position on scroll/resize
    const updatePosition = () => {
      const newRect = element.getBoundingClientRect();
      const toolbarOffset = Math.min(newRect.top, 60);
      
      debugBorder.style.top = `${newRect.top + window.scrollY}px`;
      debugBorder.style.left = `${newRect.left + window.scrollX}px`;
      debugBorder.style.width = `${newRect.width}px`;
      debugBorder.style.height = `${newRect.height}px`;
      
      debugToolbar.style.top = `${newRect.top + window.scrollY - toolbarOffset}px`;
      debugToolbar.style.left = `${newRect.left + window.scrollX}px`;
    };
    
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
  }
  
  showPermanentToast(message, eventName) {
    // Create permanent toast container
    let permanentToastContainer = document.getElementById('inspector-permanent-toast');
    if (!permanentToastContainer) {
      permanentToastContainer = document.createElement('div');
      permanentToastContainer.id = 'inspector-permanent-toast';
      permanentToastContainer.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 999999;
        pointer-events: auto;
      `;
      document.body.appendChild(permanentToastContainer);
    }
    
    const toast = document.createElement('div');
    toast.style.cssText = `
      min-width: 300px;
      max-width: 400px;
      padding: 14px 18px;
      border-radius: 10px;
      font-weight: 500;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);
      color: white;
      border: 1px solid rgba(239, 68, 68, 0.3);
      box-shadow: 0 4px 20px rgba(239, 68, 68, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      line-height: 1.4;
    `;
    
    toast.innerHTML = `
      <div style="flex-shrink: 0; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12" y2="17"></line>
        </svg>
      </div>
      <div style="flex: 1;">
        <div style="font-weight: bold; margin-bottom: 4px;">${eventName || 'Debug Event'}</div>
        <div style="opacity: 0.9;">${message}</div>
      </div>
    `;
    
    permanentToastContainer.appendChild(toast);
    
    // Store reference for cleanup
    this.debugElements.push(toast);
  }

  listenForWebAnalyticsEvents() {
    // Listen for WEBANALYTICS_API_CALL custom event
    document.addEventListener('WEBANALYTICS_API_CALL', (event) => {
      if (this.options.debug) {
        console.log('[INSPECTOR-TOOLBAR] WEBANALYTICS_API_CALL event received:', event.detail);
        
        // Extract payload from event
        const payload = event.detail || {};
        const { name, properties, description } = payload;
        
        // Format the payload for display
        let formattedMessage = '<div style="text-align: left;">';
        formattedMessage += '<div style="font-size: 15px; font-weight: 600; margin-bottom: 12px; color: #1e293b; letter-spacing: -0.025em;">Analytics Event Captured</div>';
        
        if (name) {
          formattedMessage += `
            <div style="margin-bottom: 8px;">
              <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500;">Event Name</span>
              <div style="color: #2460e3; font-size: 14px; font-weight: 600; margin-top: 2px;">${name}</div>
            </div>
          `;
        }
        
        if (description) {
          formattedMessage += `
            <div style="margin-bottom: 8px;">
              <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500;">Description</span>
              <div style="color: #475569; font-size: 13px; margin-top: 2px;">${description}</div>
            </div>
          `;
        }
        
        if (properties && Object.keys(properties).length > 0) {
          formattedMessage += `
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(36, 96, 227, 0.1);">
              <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 500;">Properties</span>
              <div style="margin-top: 8px; background: rgba(36, 96, 227, 0.05); border-radius: 8px; padding: 10px; border: 1px solid rgba(36, 96, 227, 0.1);">
          `;
          
          for (const [key, value] of Object.entries(properties)) {
            const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
            const isObject = typeof value === 'object';
            
            formattedMessage += `
              <div style="display: flex; align-items: ${isObject ? 'flex-start' : 'center'}; margin-bottom: 6px; last-child:margin-bottom: 0;">
                <span style="color: #2460e3; font-size: 12px; font-weight: 600; margin-right: 8px; min-width: fit-content;">${key}:</span>
                <span style="color: #334155; font-size: 12px; word-break: break-word; ${isObject ? 'font-family: monospace; white-space: pre-wrap;' : ''}">${displayValue}</span>
              </div>
            `;
          }
          
          formattedMessage += '</div></div>';
        }
        
        formattedMessage += '</div>';
        
        // Show the payload in a toast on the top right
        this.showAnalyticsToast(formattedMessage);
      }
    });
  }

  showAnalyticsToast(htmlContent) {
    // Create or get toast container in the main document body (outside Shadow DOM)
    let toastContainer = document.getElementById('inspector-analytics-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'inspector-analytics-toast-container';
      toastContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
        max-height: 80vh;
        overflow-y: auto;
      `;
      document.body.appendChild(toastContainer);
    }

    // Create toast element for analytics payload
    const toast = document.createElement('div');
    toast.style.cssText = `
      min-width: 380px;
      max-width: 480px;
      padding: 20px;
      border-radius: 16px;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      pointer-events: auto;
      animation: toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(16px);
      line-height: 1.6;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.98) 0%, 
        rgba(248, 250, 252, 0.98) 100%);
      color: #1e293b;
      border: 1px solid rgba(36, 96, 227, 0.2);
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04),
        0 0 0 1px rgba(36, 96, 227, 0.08),
        inset 0 1px 0 0 rgba(255, 255, 255, 1);
      transform: translateX(0);
    `;
    
    // Analytics icon with gradient
    const analyticsIcon = `
      <div style="
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #2460e3 0%, #1e50c0 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(36, 96, 227, 0.25);
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 21H3V3"></path>
          <path d="M21 12L13 12L9 16L6 13L3 16"></path>
        </svg>
      </div>
    `;

    toast.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 14px;">
        ${analyticsIcon}
        <div style="flex: 1; word-wrap: break-word; max-height: 400px; overflow-y: auto; padding-right: 10px;">
          ${htmlContent}
        </div>
        <button style="
          flex-shrink: 0; 
          width: 28px; 
          height: 28px; 
          background: rgba(36, 96, 227, 0.08); 
          border: none; 
          color: #64748b; 
          cursor: pointer; 
          transition: all 0.2s ease; 
          padding: 0; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          border-radius: 6px;
        " 
        onmouseover="this.style.background='rgba(36, 96, 227, 0.15)'; this.style.color='#2460e3';" 
        onmouseout="this.style.background='rgba(36, 96, 227, 0.08)'; this.style.color='#64748b';"
        aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div style="
        position: absolute; 
        bottom: 0; 
        left: 0; 
        height: 2px; 
        width: 100%; 
        background: linear-gradient(90deg, #2460e3 0%, #1e50c0 100%); 
        animation: toastProgress 10s linear; 
        transform-origin: left;
        opacity: 0.9;
      "></div>
    `;

    // Add CSS animations if not already present
    if (!document.getElementById('inspector-toast-styles')) {
      const style = document.createElement('style');
      style.id = 'inspector-toast-styles';
      style.textContent = `
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
      `;
      document.head.appendChild(style);
    }

    // Add to container
    toastContainer.appendChild(toast);

    // Close button functionality
    const closeBtn = toast.querySelector('button');
    const removeToast = () => {
      toast.style.animation = 'toastSlideOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
        // Remove container if empty
        if (toastContainer.children.length === 0) {
          toastContainer.remove();
        }
      }, 300);
    };

    closeBtn.addEventListener('click', removeToast);

    // Auto remove after 10 seconds (matching the progress bar duration)
    const autoRemoveTimeout = setTimeout(removeToast, 10000);

    // Clear timeout if user hovers (combined with hover effect)
    toast.addEventListener('mouseenter', () => {
      clearTimeout(autoRemoveTimeout);
      const progress = toast.querySelector('div:last-child');
      if (progress) {
        progress.style.animationPlayState = 'paused';
      }
      // Also apply hover styling
      toast.style.transform = 'translateX(-4px) scale(1.01)';
      toast.style.boxShadow = `
        0 4px 6px -1px rgba(0, 0, 0, 0.15),
        0 2px 4px -1px rgba(0, 0, 0, 0.08),
        0 25px 30px -5px rgba(0, 0, 0, 0.15),
        0 15px 20px -5px rgba(0, 0, 0, 0.08),
        0 0 0 1px rgba(36, 96, 227, 0.15),
        inset 0 1px 0 0 rgba(255, 255, 255, 1)
      `;
      toast.style.borderColor = 'rgba(36, 96, 227, 0.3)';
    });

    toast.addEventListener('mouseleave', () => {
      const progress = toast.querySelector('div:last-child');
      if (progress) {
        progress.style.animationPlayState = 'running';
      }
      // Also remove hover styling
      toast.style.transform = 'translateX(0) scale(1)';
      toast.style.boxShadow = `
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04),
        0 0 0 1px rgba(36, 96, 227, 0.08),
        inset 0 1px 0 0 rgba(255, 255, 255, 1)
      `;
      toast.style.borderColor = 'rgba(36, 96, 227, 0.2)';
    });
  }

  showMessage(message, type = 'success') {
    if (this.options.debug) {
      console.log('[INSPECTOR-TOOLBAR] Message:', message, 'Type:', type);
    }

    // Create or get toast container in the main document body (outside Shadow DOM)
    let toastContainer = document.getElementById('inspector-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'inspector-toast-container';
      toastContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
      min-width: 300px;
      max-width: 400px;
      padding: 14px 18px;
      border-radius: 10px;
      font-weight: 500;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
      ${type === 'success' ? `
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%);
        color: white;
        border: 1px solid rgba(16, 185, 129, 0.3);
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
      ` : type === 'error' ? `
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);
        color: white;
        border: 1px solid rgba(239, 68, 68, 0.3);
        box-shadow: 0 4px 20px rgba(239, 68, 68, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
      ` : type === 'warning' ? `
        background: linear-gradient(135deg, rgba(251, 146, 60, 0.95) 0%, rgba(249, 115, 22, 0.95) 100%);
        color: white;
        border: 1px solid rgba(251, 146, 60, 0.3);
        box-shadow: 0 4px 20px rgba(251, 146, 60, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
      ` : `
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%);
        color: white;
        border: 1px solid rgba(59, 130, 246, 0.3);
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
      `}
    `;
    
    // Icons for different types
    const icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>',
      warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg>'
    };

    toast.innerHTML = `
      <div style="flex-shrink: 0; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">${icons[type] || icons.info}</div>
      <div style="flex: 1; word-wrap: break-word;">${message}</div>
      <button style="flex-shrink: 0; width: 20px; height: 20px; background: transparent; border: none; color: currentColor; cursor: pointer; opacity: 0.7; transition: opacity 0.2s ease; padding: 0; display: flex; align-items: center; justify-content: center;" aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div style="position: absolute; bottom: 0; left: 0; height: 3px; width: 100%; background: rgba(255, 255, 255, 0.3); animation: toastProgress 5s linear; transform-origin: left;"></div>
    `;

    // Add CSS animations if not already present
    if (!document.getElementById('inspector-toast-styles')) {
      const style = document.createElement('style');
      style.id = 'inspector-toast-styles';
      style.textContent = `
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
      `;
      document.head.appendChild(style);
    }

    // Add to container
    toastContainer.appendChild(toast);

    // Close button functionality
    const closeBtn = toast.querySelector('button');
    const removeToast = () => {
      toast.style.animation = 'toastSlideOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
        // Remove container if empty
        if (toastContainer.children.length === 0) {
          toastContainer.remove();
        }
      }, 300);
    };

    closeBtn.addEventListener('click', removeToast);
    closeBtn.addEventListener('mouseenter', function() {
      this.style.opacity = '1';
    });
    closeBtn.addEventListener('mouseleave', function() {
      this.style.opacity = '0.7';
    });

    // Auto remove after 5 seconds
    const autoRemoveTimeout = setTimeout(removeToast, 5000);

    // Clear timeout if user hovers (optional enhancement)
    toast.addEventListener('mouseenter', () => {
      clearTimeout(autoRemoveTimeout);
      const progress = toast.querySelector('div:last-child');
      if (progress) {
        progress.style.animationPlayState = 'paused';
      }
    });

    toast.addEventListener('mouseleave', () => {
      const progress = toast.querySelector('div:last-child');
      if (progress) {
        progress.style.animationPlayState = 'running';
      }
      setTimeout(removeToast, 2000);
    });
  }

  async callApi(data) {
    const urlParams = new URLSearchParams(window.location.search);
    let apiUrl = this.options.apiUrl || urlParams.get('api_url');
    let token = this.options.token || urlParams.get('token');
    
    if (!apiUrl && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      apiUrl = 'http://87.247.186.146:8001/api/v1/';
    }

    if (!apiUrl) {
      console.error('[INSPECTOR-TOOLBAR] No api_url found in search params, skipping API call.');
      this.hideLoadingState();
      this.showMessage('API URL not configured. Please provide api_url parameter.', 'error');
      return;
    }
    
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
      "name": data?.eventType,
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
    
    try {
      const createEventUrl = apiUrl + `goals/site/domain/${window.location.hostname}`
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : {};
      const response = await fetch(createEventUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to create event';
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch (e) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        this.hideLoadingState();
        this.showMessage(errorMessage, 'error');
        return;
      }

      this.goToStep(1);
      this.$('#custom-event-form').reset();
      this.hideLoadingState();
      this.showMessage('Event created successfully!', 'success');
      this.toggleCollapse();
      
    } catch (error) {
      this.hideLoadingState();
      const errorMessage = error.message || 'Network error occurred. Please check your connection.';
      this.showMessage(`Error: ${errorMessage}`, 'error');
      console.error('[INSPECTOR-TOOLBAR] API Error:', error);
    }
  }

  async fetchCategories() {
    const urlParams = new URLSearchParams(window?.location?.search || '');
    let apiUrl = this.options.apiUrl || urlParams.get('api_url');
    let token = this.options.token || urlParams.get('token');
    
    if (!apiUrl && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      apiUrl = 'http://87.247.186.146:8001/api/v1/';
    }

    if (!apiUrl) {
      console.warn('[INSPECTOR-TOOLBAR] No API URL configured');
      return;
    }
    
    const url = `${apiUrl}analytics/categories/structure`;

    try {
      const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : {};
      const response = await fetch(url, { headers });

      const result = await response.json();

      if (this.options.debug) {
        console.log('[INSPECTOR-TOOLBAR] Categories response:', result);
      }

      const categoriesData = Object.entries(result).map(([key, value]) => {
        const productTypes = Object.keys(value || {}) || []

        return {
          category: key,
          product_types: productTypes
        }
      })

      if (!response.ok) {
        console.error(`[INSPECTOR-TOOLBAR] Error fetching categories: HTTP ${response.status}`);
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      this.categoriesData = categoriesData || []
      this.rawCategoriesData = result || null
      this.populateCategories();
    } catch (error) {
      console.error('[INSPECTOR-TOOLBAR] Failed to fetch categories:', error);
      const categorySelect = this.$('#event-category');
      categorySelect.innerHTML = '<option value="">Error loading categories</option>';
      
      this.showMessage('Failed to load categories. Please check your connection.', 'error');
    }
  }

  populateCategories() {
    const categorySelect = this.$('#event-category');
    
    if (this.options.debug) {
      console.log('[INSPECTOR-TOOLBAR] Populating categories:', this.categoriesData);
    }
    
    if (!this.categoriesData || this.categoriesData.length === 0) {
      categorySelect.innerHTML = '<option value="">No categories available</option>';
      return;
    }

    categorySelect.innerHTML = '<option value="">Select a category</option>';

    this.categoriesData.forEach(category => {
      const option = document.createElement('option');
      option.value = category.category;
      option.textContent = category.category.charAt(0).toUpperCase() + category.category.slice(1);
      categorySelect.appendChild(option);
    })
  }

  updateProductTypes(selectedCategory) {
    const productTypeSelect = this.$('#event-type');
    const attributeSelects = this.$$('[name="attributeName[]"]');
    
    productTypeSelect.innerHTML = '';
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
    const attributeSelects = this.$$('[name="attributeName[]"]');
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

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.toolbarHost) return;
      
      const isInputFocused = document.activeElement && 
        (document.activeElement.tagName === 'INPUT' || 
         document.activeElement.tagName === 'TEXTAREA' || 
         document.activeElement.tagName === 'SELECT');
      
      // Also check if the focused element is inside our Shadow DOM
      const shadowActiveElement = this.shadowRoot.activeElement;
      const isShadowInputFocused = shadowActiveElement && 
        (shadowActiveElement.tagName === 'INPUT' || 
         shadowActiveElement.tagName === 'TEXTAREA' || 
         shadowActiveElement.tagName === 'SELECT');
      
      const isAnyInputFocused = isInputFocused || isShadowInputFocused;
      
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        this.toggle();
      }
      
      if (e.key === 'Escape') {
        if (this.isInspecting) {
          e.preventDefault();
          this.stopInspecting();
        } else if (!this.collapsed && this.isVisible) {
          e.preventDefault();
          this.collapseForm();
        }
      }
      
      if (!this.collapsed && this.isVisible && !isAnyInputFocused) {
        if (e.key === 'ArrowLeft' && this.currentStep > 1) {
          e.preventDefault();
          this.prevStep();
        } else if (e.key === 'ArrowRight' && this.currentStep < this.totalSteps) {
          e.preventDefault();
          this.nextStep();
        }
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'i' && this.isVisible && !this.collapsed) {
        e.preventDefault();
        if (!this.isInspecting) {
          const inspectBtn = this.$('.selector-inspect-btn, .inspect-attribute-btn');
          if (inspectBtn) {
            inspectBtn.click();
          }
        } else {
          this.stopInspecting();
        }
      }
      
      if (e.key === 'Enter' && !isAnyInputFocused && this.currentStep === this.totalSteps && !this.collapsed) {
        e.preventDefault();
        this.handleFormSubmit(new Event('submit'));
      }
    });
    
    const form = this.$('#custom-event-form');
    if (form) {
      const interactiveElements = form.querySelectorAll('input, select, button, textarea');
      interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '0');
        }
      });
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
      this.toolbarHost.style.display = 'block';
      setTimeout(() => {
        this.toolbarHost.style.transform = 'translateX(-50%) translateY(0)';
      }, 10);
      this.isVisible = true;
    }
    return this;
  }

  hide() {
    if (this.isVisible) {
      this.toolbarHost.style.transform = 'translateX(-50%) translateY(100%)';
      setTimeout(() => {
        this.toolbarHost.style.display = 'none';
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

  destroy() {
    if (this.toolbarHost && this.toolbarHost.parentNode) {
      this.toolbarHost.parentNode.removeChild(this.toolbarHost);
    }
    if (this.highlighter && this.highlighter.parentNode) {
        this.highlighter.parentNode.removeChild(this.highlighter);
    }
    if (this.tooltip && this.tooltip.parentNode) {
        this.tooltip.parentNode.removeChild(this.tooltip);
    }
    
    // Clean up debug elements
    this.debugElements.forEach(element => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    this.debugElements = [];
    
    // Remove permanent toast container
    const permanentToastContainer = document.getElementById('inspector-permanent-toast');
    if (permanentToastContainer) {
      permanentToastContainer.remove();
    }
    
    // Remove toast container
    const toastContainer = document.getElementById('inspector-toast-container');
    if (toastContainer) {
      toastContainer.remove();
    }
    
    // Remove analytics toast container
    const analyticsToastContainer = document.getElementById('inspector-analytics-toast-container');
    if (analyticsToastContainer) {
      analyticsToastContainer.remove();
    }
    
    // Remove toast styles
    const toastStyles = document.getElementById('inspector-toast-styles');
    if (toastStyles) {
      toastStyles.remove();
    }
    // Remove debug styles
    const debugStyles = document.getElementById('inspector-debug-styles');
    if (debugStyles) {
      debugStyles.remove();
    }
    this.toolbarHost = null;
    this.shadowRoot = null;
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