import React from 'react'

import './CardBox.css'

import HighPriorityIcon from '../Assets/icons_FEtask/Img - High Priority.svg'
import MediumPriorityIcon from '../Assets/icons_FEtask/Img - Medium Priority.svg'
import LowPriorityIcon from '../Assets/icons_FEtask/Img - Low Priority.svg'
import NoPriorityIcon from '../Assets/icons_FEtask/No-priority.svg'
import UrgentIcon from '../Assets/icons_FEtask/SVG - Urgent Priority grey.svg'

import BacklogIcon from '../Assets/icons_FEtask/Backlog.svg'
import TodoIcon from '../Assets/icons_FEtask/To-do.svg'
import InProgressIcon from '../Assets/icons_FEtask/in-progress.svg'
import DoneIcon from '../Assets/icons_FEtask/Done.svg'
import CancelledIcon from '../Assets/icons_FEtask/Cancelled.svg'


export default function TaskCard(props) {
  return (
    <>
      <div className="task-card-container">
        <div className="task-id-section">
          <div className="task-id">{props.cardDetails.id}</div>
          {props.groupValue !== 'user' && (
            <div className="user-profile">
              
              <div className="user-initial" >{props.cardDetails.userObj.name[0]}{props.cardDetails.userObj.name[1]}</div>
              <div className={props.cardDetails.userObj.available ? "user-availability-indicator user-available" : "user-availability-indicator"}></div>
            </div>
          )}
        </div>
        <div className="task-header">
          {props.groupValue !== 'status' && (
            <div className="task-status-icon">
              {{
                'Backlog': <img src={BacklogIcon} alt="Backlog Icon" />,
                'Todo': <img src={TodoIcon} alt="Todo Icon" />,
                'In progress': <img src={InProgressIcon} alt="In Progress Icon" />,
                'Done': <img src={DoneIcon} alt="Done Icon" />,
                'Cancelled': <img src={CancelledIcon} alt="Cancelled Icon" />,
              }[props.cardDetails.status]}
            </div>
          )}
          <div className="task-title">
            {props.cardDetails.title}
          </div>
        </div>

        <div className="task-tags">
          {props.groupValue !== 'priority' && (
            <div>
              {{
                0: <div className="priority-icon"><img src={NoPriorityIcon} alt="No Priority Icon" /></div>,
                1: <div className="priority-icon"><img src={LowPriorityIcon} alt="Low Priority Icon" /></div>,
                2: <div className="priority-icon"><img src={MediumPriorityIcon} alt="Medium Priority Icon" /></div>,
                3: <div className="priority-icon"><img src={HighPriorityIcon} alt="High Priority Icon" /></div>,
                4: <div className="priority-icon"><img src={UrgentIcon} alt="Urgent Icon" /></div>
              }[props.cardDetails.priority]}
            </div>
          )}

          {props.cardDetails.tag.map((tag, index) => {
            return (
              <div className="tag-box" key={index}>
                <div className="tag-title">{tag}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
