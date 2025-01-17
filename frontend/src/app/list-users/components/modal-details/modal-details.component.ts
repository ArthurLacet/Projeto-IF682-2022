import { Component, Output, EventEmitter } from '@angular/core';
import { Rate } from '../../types/rate';

import { FuiBaseModal, ComponentModalConfig, ModalSize } from 'ngx-fomantic-ui';
import { User } from '../../../shared/types/User';
import { ListUsersFacade } from '../../list-users.facade';

interface IConfirmModalContext {
  userInModal: User;
}

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss'],
})
export class ModalDetailsComponent {
  constructor(
    public modal: FuiBaseModal<IConfirmModalContext, void, void>,
    private listUsersFacade: ListUsersFacade
  ) {}
  @Output() rateRequest = new EventEmitter<Rate>();

  rateUser(action: string) {
    const rate = {user: this.modal.context.userInModal, action}
    this.listUsersFacade.rateUser(rate);
    this.modal.approve()
  }
}

export class ModalDetails extends ComponentModalConfig<
  IConfirmModalContext,
  void,
  void
> {
  constructor(userInModal: User, size = ModalSize.Tiny) {
    super(ModalDetailsComponent, { userInModal });
    this.isClosable = true;
    this.transitionDuration = 200;
    this.size = size;
    this.isCentered = true;
  }
}
