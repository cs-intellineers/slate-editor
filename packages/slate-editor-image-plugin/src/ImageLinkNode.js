import React, { Component } from 'react'
import classnames from 'classnames'

import ImageDataModal from './ImageDataModal'
import ImageEditLayer from './ImageEditLayer'

class ImageLinkNode extends Component {
  constructor(props) {
    super(props)
    this.state = { isModalActive: false }
  }

  modal(isModalActive) {
    this.setState({ isModalActive })
  }

  render() {
    const { isModalActive } = this.state
    const {
      node,
      attributes,
      readOnly,
      editor: {
        onChange,
        props: { value }
      }
    } = this.props

    return (
      <span>
        {!isModalActive ? null : (
          <ImageDataModal
            node={node}
            value={value}
            onChange={onChange}
            changeModalState={this.modal.bind(this)}
          />
        )}

        <div className={classnames('image-node--container', { readonly: readOnly })}>
          <ImageEditLayer
            changeModalState={this.modal.bind(this)}
            text="Editar"
          />
          <a
            href={node.data.get('href')}
            target={node.data.get('openExternal') ? '_blank' : '_self'}
          >
            <img
              {...attributes}
              role="presentation"
              className="image-node"
              src={node.data.get('src')}
              title={node.data.get('title')}
              alt={node.data.get('title')}
            />
          </a>
        </div>
      </span>
    )
  }
}

export default ImageLinkNode
