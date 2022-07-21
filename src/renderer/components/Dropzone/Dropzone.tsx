import { useEffect, useRef } from 'react';

function Dropzone() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    container.current.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // for (let f of e.dataTransfer.files) {
      //   console.log('The file(s) you dragged: ', f);
      //   window.electron.ipcRenderer.sendMessage('ondragstart', f.path);
      // }
    });
    container.current.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }, []);

  //   $('#btn').on('click', () => {
  //     let txtarea = $('#txtarea').val();
  //     ipcRenderer.send('clickedbutton', txtarea);
  //   });

  //   ipcRenderer.on('fileData', (event, data) => {
  //     $('#txtarea').text(data);
  //   });

  return <div ref={container}>Drop Here</div>;
}

export default Dropzone;
