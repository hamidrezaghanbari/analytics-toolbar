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
          <div class="toolbar-logo">LOGO</div>
          <div class="toolbar-divider"></div>
          <div class="toolbar-actions">
            <button class="toolbar-button" id="create-event-btn">Create Custom Event</button>
            <div id="selector-display" class="selector-display"></div>
          </div>
        </div>
        <div class="toolbar-right">
          <button class="inspector-toolbar-collapse">−</button>
        </div>
      </div>
      <div class="custom-event-form-container" style="display: none;">
        <form id="custom-event-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="event-category">Category <span class="required-badge">Required</span></label>
              <select id="event-category" name="category" required>
                <option value="analytics">Analytics</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
            <div class="form-group">
              <label for="event-type">Event Type <span class="required-badge">Required</span></label>
              <input type="text" id="event-type" name="eventType" list="event-type-list" required>
              <datalist id="event-type-list">
                <option value="click">
                <option value="scroll">
                <option value="submit">
              </datalist>
            </div>
            <div class="form-group">
              <label for="counting-type">Counting Type <span class="required-badge">Required</span></label>
              <select id="counting-type" name="countingType" required>
                <option value="once">Once</option>
                <option value="every_time">Every Time</option>
              </select>
            </div>
            <div class="form-group">
              <label for="css-selector">CSS Selector <span class="required-badge">Required</span></label>
              <div class="input-with-icon">
                <input type="text" id="css-selector" name="cssSelector" required>
                <button type="button" id="css-selector-inspect-btn" class="toolbar-button icon-button" title="Inspect Element">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-crosshair"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
                </button>
              </div>
            </div>
          </div>
          <div id="paths-container" class="form-section">
            <label class="form-section-label">Paths <span class="required-badge">Required</span></label>
            <div class="path-item">
              <input type="text" name="pathType[]" placeholder="Type" required>
              <input type="text" name="pathValue[]" placeholder="Value" required>
              <button type="button" class="remove-path-btn">-</button>
            </div>
          </div>
          <div id="attributions-container" class="form-section">
            <label class="form-section-label">Attributions <span class="required-badge">Required</span></label>
            <div class="attribute-item">
              <input type="text" name="attributeKey[]" placeholder="Key" required>
              <div class="input-with-icon">
                <input type="text" name="attributeValue[]" placeholder="Value" required>
                <button type="button" class="inspect-attribute-btn toolbar-button icon-button" title="Inspect Element">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-crosshair"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
                </button>
              </div>
              <button type="button" class="remove-attribute-btn">-</button>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" id="add-path-btn">Add Path</button>
            <button type="button" id="add-attribute-btn">Add Attribute</button>
            <button type="submit">Create Event</button>
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
      bottom: this.options.position === 'bottom' ? '0' : '60px',
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

    const inspectBtn = this.toolbar.querySelector('#css-selector-inspect-btn');
    inspectBtn.addEventListener('click', () => this.toggleInspector());

    const createEventBtn = this.toolbar.querySelector('#create-event-btn');
    createEventBtn.addEventListener('click', () => this.toggleEventForm());

    const addPathBtn = this.toolbar.querySelector('#add-path-btn');
    addPathBtn.addEventListener('click', () => this.addPathInput());

    const addAttributeBtn = this.toolbar.querySelector('#add-attribute-btn');
    addAttributeBtn.addEventListener('click', () => this.addAttributeInput());

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
        this.removeAttributeInput(e.target.closest('.attribute-item'));
      }
      if (e.target.closest('.inspect-attribute-btn')) {
        this.activeAttributeValueInput = e.target.closest('.input-with-icon').querySelector('input');
        this.toggleInspector();
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
    } else {
      this.stopInspecting();
    }
  }

  startInspecting() {
    document.body.style.cursor = 'crosshair';
    this.toolbar.querySelector('#css-selector-inspect-btn').classList.add('active');
    document.addEventListener('mouseover', this.boundHandleMouseOver);
    document.addEventListener('mouseout', this.boundHandleMouseOut);
    document.addEventListener('click', this.boundHandleClick, true);
  }

  stopInspecting() {
    document.body.style.cursor = 'default';
    this.toolbar.querySelector('#css-selector-inspect-btn').classList.remove('active');
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
      this.toolbar.querySelector('#selector-display').textContent = selector;
      this.toolbar.querySelector('#css-selector').value = selector;
    }
    this.toggleInspector();
  }

  toggleEventForm() {
    const formContainer = this.toolbar.querySelector('.custom-event-form-container');
    const createEventBtn = this.toolbar.querySelector('#create-event-btn');
    const isVisible = formContainer.style.display !== 'none';
    formContainer.style.display = isVisible ? 'none' : 'block';
    createEventBtn.classList.toggle('active', !isVisible);
  }

  addPathInput() {
    const pathsContainer = this.toolbar.querySelector('#paths-container');
    const newPathItem = document.createElement('div');
    newPathItem.className = 'path-item';
    newPathItem.innerHTML = `
      <input type="text" name="pathType[]" placeholder="Type" class="path-type" required>
      <input type="text" name="pathValue[]" placeholder="Value" class="path-value" required>
      <button type="button" class="remove-path-btn">-</button>
    `;
    pathsContainer.appendChild(newPathItem);
  }

  removePathInput(button) {
    button.parentElement.remove();
  }

  addAttributeInput() {
    const attributionsContainer = this.toolbar.querySelector('#attributions-container');
    const newAttributeItem = document.createElement('div');
    newAttributeItem.className = 'attribute-item';
    newAttributeItem.innerHTML = `
      <input type="text" name="attributeKey[]" placeholder="Key" required>
      <div class="input-with-icon">
        <input type="text" name="attributeValue[]" placeholder="Value" required>
        <button type="button" class="inspect-attribute-btn toolbar-button icon-button" title="Inspect Element">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-crosshair"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
        </button>
      </div>
      <button type="button" class="remove-attribute-btn">-</button>
    `;
    attributionsContainer.appendChild(newAttributeItem);
  }

  removeAttributeInput(item) {
    item.remove();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear previous validation errors
    this.clearValidationErrors();
    
    // Validate required fields
    const requiredFields = ['category', 'eventType', 'countingType', 'cssSelector'];
    let hasErrors = false;
    
    requiredFields.forEach(fieldName => {
      const field = e.target.querySelector(`[name="${fieldName}"]`);
      if (!field.value.trim()) {
        field.classList.add('error');
        hasErrors = true;
      }
    });
    
    // Validate paths (at least one path with both type and value)
    const pathTypeFields = e.target.querySelectorAll('input[name="pathType[]"]');
    const pathValueFields = e.target.querySelectorAll('input[name="pathValue[]"]');
    let hasValidPath = false;
    
    for (let i = 0; i < pathTypeFields.length; i++) {
      const typeField = pathTypeFields[i];
      const valueField = pathValueFields[i];
      
      if (typeField.value.trim() && valueField.value.trim()) {
        hasValidPath = true;
        typeField.classList.remove('error');
        valueField.classList.remove('error');
      } else if (typeField.value.trim() || valueField.value.trim()) {
        // If one is filled but not both, show error
        if (!typeField.value.trim()) typeField.classList.add('error');
        if (!valueField.value.trim()) valueField.classList.add('error');
        hasErrors = true;
      }
    }
    
    if (!hasValidPath) {
      pathTypeFields.forEach(field => field.classList.add('error'));
      pathValueFields.forEach(field => field.classList.add('error'));
      hasErrors = true;
    }
    
    // Validate attributes (at least one attribute with both key and value)
    const attributeKeyFields = e.target.querySelectorAll('input[name="attributeKey[]"]');
    const attributeValueFields = e.target.querySelectorAll('input[name="attributeValue[]"]');
    let hasValidAttribute = false;
    
    for (let i = 0; i < attributeKeyFields.length; i++) {
      const keyField = attributeKeyFields[i];
      const valueField = attributeValueFields[i];
      
      if (keyField.value.trim() && valueField.value.trim()) {
        hasValidAttribute = true;
        keyField.classList.remove('error');
        valueField.classList.remove('error');
      } else if (keyField.value.trim() || valueField.value.trim()) {
        // If one is filled but not both, show error
        if (!keyField.value.trim()) keyField.classList.add('error');
        if (!valueField.value.trim()) valueField.classList.add('error');
        hasErrors = true;
      }
    }
    
    if (!hasValidAttribute) {
      attributeKeyFields.forEach(field => field.classList.add('error'));
      attributeValueFields.forEach(field => field.classList.add('error'));
      hasErrors = true;
    }
    
    if (hasErrors) {
      return;
    }
    
    const formData = new FormData(e.target);
    const data = {
      category: formData.get('category'),
      eventType: formData.get('eventType'),
      countingType: formData.get('countingType'),
      cssSelector: formData.get('cssSelector'),
      paths: [],
      attributions: []
    };
    const pathTypes = formData.getAll('pathType[]');
    const pathValues = formData.getAll('pathValue[]');
    for (let i = 0; i < pathTypes.length; i++) {
      data.paths.push({
        type: pathTypes[i],
        value: pathValues[i]
      });
    }
    const attributeKeys = formData.getAll('attributeKey[]');
    const attributeValues = formData.getAll('attributeValue[]');
    for (let i = 0; i < attributeKeys.length; i++) {
      data.attributions.push({
        key: attributeKeys[i],
        value: attributeValues[i]
      });
    }
    console.log('Custom Event Created:', data);
    this.toggleEventForm();
    e.target.reset();
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
      this.toolbar.style.transform = 'translateX(-50%) translateY(0)';
      this.isVisible = true;
    }
    return this;
  }

  hide() {
    if (this.isVisible) {
      const translateY = this.options.position === 'top' ? '-100%' : '100%';
      this.toolbar.style.transform = `translateX(-50%) translateY(${translateY})`;
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
    const collapseBtn = this.toolbar.querySelector('.inspector-toolbar-collapse');
    const isCollapsed = formContainer.style.display === 'none';
    
    formContainer.style.display = isCollapsed ? 'block' : 'none';
    collapseBtn.textContent = isCollapsed ? '−' : '+';
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
