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
            <button class="toolbar-button" id="inspect-btn">Inspect</button>
            <button class="toolbar-button" id="create-event-btn">Create Custom Event</button>
            <div id="selector-display" class="selector-display"></div>
          </div>
        </div>
        <div class="toolbar-right">
          <button class="inspector-toolbar-close">×</button>
        </div>
      </div>
      <div class="custom-event-form-container" style="display: none;">
        <form id="custom-event-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="event-category">Category</label>
              <select id="event-category" name="category">
                <option value="analytics">Analytics</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
            <div class="form-group">
              <label for="event-type">Event Type</label>
              <input type="text" id="event-type" name="eventType" list="event-type-list">
              <datalist id="event-type-list">
                <option value="click">
                <option value="scroll">
                <option value="submit">
              </datalist>
            </div>
            <div class="form-group">
              <label for="counting-type">Counting Type</label>
              <select id="counting-type" name="countingType">
                <option value="once">Once</option>
                <option value="every_time">Every Time</option>
              </select>
            </div>
            <div class="form-group">
              <label for="css-selector">CSS Selector</label>
              <input type="text" id="css-selector" name="cssSelector">
            </div>
          </div>
          <div id="paths-container" class="form-section">
            <label class="form-section-label">Paths</label>
            <div class="path-item">
              <input type="text" name="pathType[]" placeholder="Type">
              <input type="text" name="pathValue[]" placeholder="Value">
              <button type="button" class="remove-path-btn">-</button>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" id="add-path-btn">Add Path</button>
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
    const closeBtn = this.toolbar.querySelector('.inspector-toolbar-close');
    closeBtn.addEventListener('click', () => this.hide());

    const inspectBtn = this.toolbar.querySelector('#inspect-btn');
    inspectBtn.addEventListener('click', () => this.toggleInspector());

    const createEventBtn = this.toolbar.querySelector('#create-event-btn');
    createEventBtn.addEventListener('click', () => this.toggleEventForm());

    const addPathBtn = this.toolbar.querySelector('#add-path-btn');
    addPathBtn.addEventListener('click', () => this.addPathInput());

    const form = this.toolbar.querySelector('#custom-event-form');
    form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    this.toolbar.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-path-btn')) {
        this.removePathInput(e.target);
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
    this.toolbar.querySelector('#inspect-btn').classList.add('active');
    document.addEventListener('mouseover', this.boundHandleMouseOver);
    document.addEventListener('mouseout', this.boundHandleMouseOut);
    document.addEventListener('click', this.boundHandleClick, true);
  }

  stopInspecting() {
    document.body.style.cursor = 'default';
    this.toolbar.querySelector('#inspect-btn').classList.remove('active');
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
    this.toolbar.querySelector('#selector-display').textContent = selector;
    this.toolbar.querySelector('#css-selector').value = selector;
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
      <input type="text" name="pathType[]" placeholder="Type" class="path-type">
      <input type="text" name="pathValue[]" placeholder="Value" class="path-value">
      <button type="button" class="remove-path-btn">-</button>
    `;
    pathsContainer.appendChild(newPathItem);
  }

  removePathInput(button) {
    button.parentElement.remove();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      category: formData.get('category'),
      eventType: formData.get('eventType'),
      countingType: formData.get('countingType'),
      cssSelector: formData.get('cssSelector'),
      paths: []
    };
    const pathTypes = formData.getAll('pathType[]');
    const pathValues = formData.getAll('pathValue[]');
    for (let i = 0; i < pathTypes.length; i++) {
      data.paths.push({
        type: pathTypes[i],
        value: pathValues[i]
      });
    }
    console.log('Custom Event Created:', data);
    this.toggleEventForm();
    e.target.reset();
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
