const changeUploadFile = async (e) => {
  try {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:5001/api/v0/add', {
      method: 'POST',
      body: formData,
    });
    var datax = await $.get('http://localhost:8080/ipfs/' + recordHash);
    var data = await response.json();
    ipfsHash_report = data.Hash;
    datax['Report'] = `http://localhost:8080/ipfs/${ipfsHash_report}`;
    var ipfs = window.IpfsApi('localhost', '5001');
    publicKey = web3.currentProvider.selectedAddress;
    publicKey = publicKey.toLowerCase();
    const Buffer = window.IpfsApi().Buffer;
    // const name = a;
    const age = b.c[0];
    const name = datax['name'];
    const savedata = datax;
    // console.log("savedd: ", savedata);
    var buffer = Buffer(JSON.stringify(savedata));

    ipfs.files.add(buffer, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log('result:' + result);
        recordHash = result[0].hash;
        $('#recordsHash').html(`http://localhost:8080/ipfs/${recordHash}`);
        $('#recordsHash').attr(
          'href',
          `http://localhost:8080/ipfs/${recordHash}`,
        );
        const designation = 0; //patient
        console.log(name, age, designation, recordHash);
        contractInstance.add_details(
          name,
          age,
          designation,
          recordHash,
          { gas: 2000000 },
          (err, res) => {
            if (!err) {
              console.log('Successfully added report');
            } else {
              console.log(err);
            }
          },
        );
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    uploadStatus.textContent = 'An error occurred while uploading the file.';
  }
};
const changeScannedImage = async (e) => {
  try {
    console.log('cahng 5');
    e.preventDefault();
    var data2 = await $.get('http://localhost:8080/ipfs/' + recordHash);
    data2['Scanned_Image'] = $('#outputImageScanned')?.attr('src');
    var ipfs = window.IpfsApi('localhost', '5001');
    publicKey = web3.currentProvider.selectedAddress;
    publicKey = publicKey.toLowerCase();
    const Buffer = window.IpfsApi().Buffer;
    // const name = a;
    const age = b.c[0];
    const name = data2['name'];
    const savedata = data2;
    var buffer = Buffer(JSON.stringify(savedata));

    ipfs.files.add(buffer, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log('result:' + result);
        recordHash = result[0].hash;
        $('#recordsHash').html(`http://localhost:8080/ipfs/${recordHash}`);
        $('#recordsHash').attr(
          'href',
          `http://localhost:8080/ipfs/${recordHash}`,
        );
        const designation = 0; //patient
        console.log(name, age, designation, recordHash);
        contractInstance.add_details(
          name,
          age,
          designation,
          recordHash,
          { gas: 2000000 },
          (err, res) => {
            if (!err) {
              console.log('Successfully added report');
            } else {
              console.log(err);
            }
          },
        );
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    uploadStatus.textContent = 'An error occurred while uploading the file.';
  }
};

const showRecordFromObjectRec = (obj, parentEle) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];
      if (key === 'Report' && value)
        keyValueElement = $(
          `<iframe src="${value}" style="width:400px; height:400px; object-fit: cover; display:block; margin-top:20px; margin-bottom:20px;" frameborder="0"></iframe>`,
        );
      else if (key === 'Scanned_Image' && value)
        keyValueElement = $(
          `<img src="${value}" style="width:400px; height:auto; object-fit: cover; display:block; margin-top:20px; margin-bottom:20px;" frameborder="0" />`,
        );
      else if (key === 'diagnosis') {
        value?.forEach((dia) => {
          showRecordFromObjectRec(dia, parentEle);
        });
      } else keyValueElement = $(`<p>${key}: ${value}</p>`);
      parentEle.append(keyValueElement);
    }
  }
};
