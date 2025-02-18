import React from 'react';
import { Bs0Square, Bs1SquareFill, BsArchive, BsArchiveFill, BsPeople, BsCircleFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar sidebar-responsive" : "sidebar"}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCircleFill className='icon_header' />
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        {/*<li className='sidebar-list-item'>
          <a href='/admin/svi'> <BsArchive className='icon' /> Svi projekti</a>
        </li>*/}
        <li className='sidebar-list-item'>
          <a href='/admin/eksperimenti'> <BsArchiveFill className='icon' /> Eksperimenti</a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/novi-eksperiment'> <Bs1SquareFill className='icon' /> Novi Eksperiment</a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/promijeni-eksperiment'> <Bs0Square className='icon' /> Promijeni Eksperiment</a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/users'> <BsPeople className='icon' /> Useri</a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/testers'> <BsPeople className='icon' /> Testeri</a>
        </li>
      </ul> 
    </aside>
  );
}

export default Sidebar;
