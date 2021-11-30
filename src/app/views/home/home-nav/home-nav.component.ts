import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationModel, User } from 'src/models';
import { Booking } from 'src/models/booking.model';
import { AccountService, NavigationService } from 'src/services';
import { BookingService } from 'src/services/booking.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {
  navItems: NavigationModel[];
  toolbarItems: NavigationModel[];
  @Input() showNav: boolean;
  @Output() navAction: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();
  laundry: string;
  carwash: string;
  saloon = 'saloon';
  shopping: string;
  showMenu: boolean;
  user: User;
  booking: Booking;
  cartCount = 0;
  showCart: boolean;
  constructor(
    private navigationService: NavigationService,
    private accountService: AccountService,
    private router: Router,
    private bookingService: BookingService,

  ) {

  }

  ngOnInit() {
    this.booking = this.bookingService.currentBookingValue;

    if (this.booking && this.booking.BookingItems && this.booking.BookingItems.length) {
      this.cartCount = this.booking.BookingItems.length;
    }
    this.user = this.accountService.currentUserValue;
    this.navigationService.getHomeNavigation().subscribe(data => {
      if (data.length > 0) {
        this.navItems = data;
        this.navItems[0].Class = 'active';
      }
    });

    this.navigationService.getToolbarNavigation().subscribe(data => {
      if (data.length > 0) {
        this.toolbarItems = data;
      }
    });

  }

  actionClick() {
    // this.navAction.emit(true);
  }

  navItemClicked(name) {
    this.selectedItem.emit(name);
    this.navItems.forEach(item => {
      if (item.Label === name) {
        item.Class = 'active';
      } else {
        item.Class = '';
      }
    });
  }
  login() {
    this.router.navigate(['sign-in']);
  }
  register() {
    this.router.navigate(['sign-up']);
  }
  contact() {
    this.router.navigate(['contact']);
  }
  tab(tab: string) {
    if (tab === 'laundry') {
      this.laundry = 'laundry';
      this.carwash = '';
      this.shopping = '';
      this.saloon = '';
    }
    if (tab === 'carwash') {
      this.laundry = '';
      this.carwash = 'carwash';
      this.shopping = '';
      this.saloon = '';
    }
    if (tab === 'shopping') {
      this.laundry = '';
      this.carwash = '';
      this.saloon = '';
      this.shopping = 'shopping';
    }
    if (tab === 'saloon') {
      this.laundry = '';
      this.carwash = '';
      this.shopping = '';
      this.saloon = 'saloon';
    }
    this.navAction.emit(tab);
  }

  toggle() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.user = null;
    this.accountService.updateUserState(null);
  }
  cart(){
    this.showCart = !this.showCart;
  }
}
