export default function getItems(page) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let charObj = JSON.parse(this.responseText);
      for (let i = 0; i < charObj.length; i++) {
        let p = document.createElement('p');
        let name = document.createTextNode(charObj[i].name);
        p.appendChild(name);
        document.body.appendChild(p);
      }
    }
  };
  req.open(
    'GET',
    'https://www.anapioficeandfire.com/api/characters?page=' +
      page +
      '&pageSize=10',
    true
  );
}
