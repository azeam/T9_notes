import React, { Component } from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './BurgMenu.style';
import { groupBy } from '../utils/grouper';
import CatBtn from './Button';
import Moment from 'react-moment';


class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      allData: []
    }
  }
  
  filterById(id){
    var result = this.props.notes.filter(cat => cat.category === id);
    this.setState({
      filteredResult: result
    });
  }

  renderCatButtons(data, filteredCategory)
  {
    if(filteredCategory === undefined)
      return null;
    
    if(data.category === filteredCategory[0].category)
    {
      return(
        <div>
          <CatBtn label={data.title} key={"btn" + data.noteId} id={data.noteId} onClick={() => { this.props.getSingleNote(data.noteId); this.props.setOpen(false); }}>
          {data.body}
          </CatBtn><br></br>
          <Moment format="DD MMM YYYY, HH:mm:ss">{data.timestamp}</Moment>
        </div>
      )
    }
  }

  render(){

    const isHidden = this.props.open ? true : false;
    
    const categories = groupBy(this.props.notes, "category");
    const filteredCategory = this.state.filteredResult;
    
    return (
      <StyledMenu open={this.props.open} aria-hidden={!isHidden} {...this.props}>
        <CatBtn label="New Note" onClick={() => { this.props.newNote(); this.props.setOpen(false); }}></CatBtn>
      {
        Object.entries(categories).map((cat) => {
          let [id, allData] = cat;
          return (
            <div>
              <ul key={id} onClick={() => this.filterById(id)}> 
                {id}<br></br>
                {
                  allData.map((data) => {
                    return (
                      <div key={data.noteId}>  
                        {this.renderCatButtons(data, filteredCategory)}
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