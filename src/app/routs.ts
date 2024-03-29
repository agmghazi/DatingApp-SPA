import { AuthGuard } from './_guards/auth.guard';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MessagesComponent } from './messages/messages.component';
import { MessagesResolver } from './_resolvers/message.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import {Routes} from '@angular/router';

export const appRouts: Routes = [
    {path: 'home', component: HomeComponent},
    {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        {path: 'members', component: MemberListComponent , resolve: {users: MemberListResolver}},
        {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
        {path: 'member/edit', component:  MemberEditComponent,
           resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
        {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
        {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
      ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
