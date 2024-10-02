import React from 'react'

import './List.css'
import Card from '../CardBox/CardBox'
import Backlog from '../Assets/icons_FEtask/Backlog.svg'
import Todo from '../Assets/icons_FEtask/To-do.svg'
import Inprocess from '../Assets/icons_FEtask/in-progress.svg'
import Done from '../Assets/icons_FEtask/Done.svg'
import Cancelled from '../Assets/icons_FEtask/Cancelled.svg'

import HighPriority from '../Assets/icons_FEtask/Img - High Priority.svg'
import MediumPriority from '../Assets/icons_FEtask/Img - Medium Priority.svg'
import LowPriority from '../Assets/icons_FEtask/Img - Low Priority.svg'
import NoPriority from '../Assets/icons_FEtask/No-priority.svg'
import Urgent  from '../Assets/icons_FEtask/SVG - Urgent Priority colour.svg'


import Add  from '../Assets/icons_FEtask/add.svg'
import Dots  from '../Assets/icons_FEtask/3 dot menu.svg'


let cardCount = 0;

export default function List(props) {
  return (
    <>
        <div className="list-container">
            <div className="list-header">
                <div className="list-header-left">
                    {
                        {
                            'status' : <>{
                                {
                                    'Backlog': <div className="list-icon">
                                    <img src={Backlog} alt="Backlog Icon" />
                                    </div>,
                                    'Todo': <div className="list-icon">
                                    <img src={Todo} alt="Todo Icon" />
                                    </div>,
                                    'In progress': <div className="list-icon">
                                    <img src={Inprocess} alt="Inprocess Icon" />
                                    </div>,
                                    'Done': <div className="list-icon">
                                    <img src={Done} alt="Done Icon" />
                                    </div>,
                                    'Cancelled': <div className="list-icon">
                                    <img src={Cancelled} alt="Cancelled Icon" />
                                    </div>
                                }[props.listTitle]
                            } </>,
                            'user':  <>
                            <div className="list-icon">
                              <div className="card-profile">
                                <div className="card-profile-initial">
                                  {props.listTitle[0]}
                                  {props.listTitle[1]}
                                </div>
                                {/* Show availability status if available */}
                                <div
                                  className={
                                    props.ticketDetails.find(ticket => ticket.userObj.name === props.listTitle)?.userObj?.available
                                      ? 'card-profile-initial-available card-profile-initial-available-true'
                                      : 'card-profile-initial-available'
                                  }
                                ></div>
                              </div>
                            </div>
                          </>,
                            'priority' : <>{
                                {
                                    0: <div className="list-icon"><img src={NoPriority} alt="NO Priority Icon" /></div>,
                                    1: <div className="list-icon"><img src={LowPriority} alt="Low Priority Icon" /></div>,
                                    2: <div className="list-icon"><img src={MediumPriority} alt="Medium Priority Icon" /></div>,
                                    3: <div className="list-icon"><img src={HighPriority} alt="High Priority Icon" /></div>,
                                    4: <div className="list-icon"><img src={Urgent} alt="Urgent Icon" /></div>
            
                                }[props.listTitle]
                            } </>
                        }[props.groupValue]
                    }
                    
                    <div className="list-title">
                        {
                            {
                                'priority' : <>{
                                                props.priorityList
                                                    ? props.priorityList.map(priorityProperty => (
                                                        priorityProperty.priority === props.listTitle
                                                        ? <>{priorityProperty.name}</>
                                                        : null
                                                    ))
                                                    : null
                                                }</>,
                                'status' : <>{props.listTitle}</>,
                                'user': (
    <>
        <div className="list-title">{props.listTitle}</div>
      </>
)
                                // 'user' : <>{props.listTitle}</>
                            }[props.groupValue]
                        }
                    </div>
                    <div className="list-sum">{cardCount}</div>
                </div>
                <div className="list-header-right">
                    <div className="list-add-item">
                    <img src={Add} alt="Add Icon" />
                    </div>
                    <div className="list-option-item">
                    <img src={Dots} alt="dots Icon" />
                    </div>
                </div>
            </div>

            <div className="list-card-items">
                {
                    props.ticketDetails.map(ticket => {
                        if(ticket.status === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} groupValue={props.groupValue} />
                            )
                        }
                        else if(ticket.priority === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} groupValue={props.groupValue} />
                            )
                        }
                        else if(ticket.userObj.name === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} groupValue={props.groupValue} />
)
                        }
                        return null
                    }, cardCount = 0)
                    
                }
            </div>
        </div>
    </>
  )
}
