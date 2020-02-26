import React from 'react';


class UploadedFiles extends React.Component {

  constructor(props) {
      super(props);
    }
// irgendwo muss key=fild.id hin
    render() {
      const content = this.props.files.map((file) => (
          <tr>
            <td>{file.filename}</td>
            <td>{file.hash}</td>
          </tr>
        ));
      return (
        <div>
          <table>
            <thead>
                <tr>
                  <th>Path</th>
                  <th>Hash</th>
                </tr>
              </thead>
              <tbody>
                {content}
              </tbody>
            </table>
        </div>
      );
    }
  }
  export default UploadedFiles;
