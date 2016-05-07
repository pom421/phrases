import React, {Component} from 'react';

// méthode utilitaire pour récupérer des phrases (à terme à récupérer via une API)
function fetchPhrases(){
  var req = new XMLHttpRequest();
  req.open('GET', 'json/data.json', false);
  req.send(null);

  if (req.status != 200) {
    console.log('Problème pour récupérer le fichier json');
  }
  return JSON.parse(req.responseText);
}

let phrases = fetchPhrases();

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// composant React qui contient les 2 phrases
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      en: "",
      fr: "",
      idPhrase: 0,
      visibility: false
    }
    this.displayNew = this.displayNew.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  componentDidMount() {
    console.log('dans didMount')
    // gestionnaire d'évènement monté quand le DOM est prêt
    document.body.addEventListener('keyup', this.onKeyUp);
  }
  onKeyUp(e) {
    var intKey = (window.Event) ? e.which : e.keyCode;
    console.log("keycode", intKey);
    // flêches gauche et droite pour avancer dans les phrases
    if (intKey === 37 || intKey === 39) {
      this.displayNew();
    }
    // flêches haut et bas pour révéler la phrase en français
    else if (intKey === 38 || intKey === 40) {
      this.unhide();
    }
  }
  // pour supprimer le floutage de la phrase cachée
  unhide() {
    this.setState({
      visibility: true
    })
  }
  displayNew() {
    let rand = getRandomIntInclusive(0, phrases.length - 1);
    this.setState({
      en: phrases[rand].en,
      fr: phrases[rand].fr,
      idPhrase: rand,
      visibility: false
    });
  }
  render() {
    console.log('dans render')
    return (
      <div className="flex">
        <button onClick={this.displayNew}>Nouvelle phrase</button>
        <div className="card">
          <div className="en" title={this.state.idPhrase}>{this.state.en}</div>
          <div className={this.state.visibility ? "" : "hidden"}>{this.state.fr}</div>
        </div>
      </div>
    );
  }
}

export default Card;
