import React, { Component } from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './BurgMenu.style';
import { groupBy } from '../utils/grouper';
import CatBtn from './Button';
import HamMenu from './HamMenu';
import Moment from 'react-moment';
import './BurgMenu.css';
import './Fonts.css';


class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      allData: []
    }
  }
  
  Click(){
    if(CatBtn){
      <HamMenu open={this.props.close} setOpen={this.props.setOpen(false)}></HamMenu>
    }
  }
  
  // filterById(id){
  //   var filteredResult = this.props.notes.filter(cat => () );
  // onClick={this.filterById(id)}
  // }

  render(){

    const isHidden = this.props.open ? true : false;
    // const tabIndex = isHidden ? 0 : -1;
    
    const categories = groupBy(this.props.notes, "category");
    
    return (
      <StyledMenu open={this.props.open} aria-hidden={!isHidden} {...this.props}>
      <div id="menu-btn-back"> 
        <div id="menu-btn-foreground">
          <CatBtn className="btn" id="new-note-btn" label="New Note" onClick={() => { this.props.newNote(); this.Click(); }}></CatBtn>
        </div>
      </div> 
      {
        Object.entries(categories).map((cat) => {
          let [id, allData] = cat;
          return (
            <div id="menu-outer">
              <ul key={id}> 
              <div id="menu-inner">
                <p id="category-name" className="menu-p" >{id}</p>
              </div>
              {
                allData.map((data) => {
                  return (                     
                      <div id="menu-entry" key={data.noteId}>
                          
                          <p className="menu-p">{data.title}</p>
                        
                          <CatBtn className="edit-btn btn" id="catBtn" label="E" key={"btn" + data.noteId} onClick={() => { this.props.handleSingleNote(data.noteId, "edit"); this.Click(); }}>
                          {data.body}
                          </CatBtn>&nbsp;&nbsp;
                          <CatBtn className="delete-btn btn" label="E" key={"delBtn" + data.noteId} id={"delBtn" + data.noteId} onClick={() => { this.props.handleSingleNote(data.noteId, "delete") }}>
                          Delete
                          </CatBtn>
                          <br></br>
                          <span className="note-time">Last edited:&nbsp;</span><Moment className="note-time" format="DD MMM YYYY, HH:mm:ss">{data.timestamp}</Moment>

                        </div>
                )
              })
            }
            </ul>
            </div>
            )
          })
      }
      </StyledMenu>
  )
  }
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;