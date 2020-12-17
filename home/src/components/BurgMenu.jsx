import React, { Component } from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './BurgMenu.style';
import { groupBy } from '../utils/grouper';
import CatBtn from './Button';
import HamMenu from './HamMenu';
import Moment from 'react-moment';
import './BurgMenu.css';


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
        <CatBtn label="New Note" onClick={() => { this.props.newNote(); this.Click(); }}></CatBtn>
      {
        Object.entries(categories).map((cat) => {
          let [id, allData] = cat;
          return (
            <div id="menu-outer">
            <ul key={id} > 
                  {id}<br></br>
              {
                allData.map((data) => {
                  return (
                    <div id="menu-entry" key={data.noteId}>
                        <CatBtn id="catBtn" label={data.title} key={"btn" + data.noteId} id={data.noteId} onClick={() => { this.props.getSingleNote(data.noteId); this.Click(); }}>
                        {data.body}
                        </CatBtn><br></br>
                        <Moment format="DD MMM YYYY, HH:mm:ss">{data.timestamp}</Moment>
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