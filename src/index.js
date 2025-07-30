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
            <div id="selector-display" class="selector-display"></div>
          </div>
        </div>
        <div class="toolbar-right">
          <button class="inspector-toolbar-close">×</button>
        </div>
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
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target;
    if (target === this.toolbar || this.toolbar.contains(target)) {
      return;
    }

    const selector = this.getCssSelector(target);
    this.toolbar.querySelector('#selector-display').textContent = selector;
    this.toggleInspector();
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
