import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MovieService } from 'src/app/movies/movie.service';
import { WatchProvider } from '../watch-provider.model';
import { WatchProviderService } from '../watch-provider.service';

@Component({
  selector: 'app-watch-providers',
  templateUrl: './watch-providers.component.html',
  styleUrls: ['./watch-providers.component.css']
})
export class WatchProvidersComponent implements OnInit, OnDestroy {

  providerForm: FormGroup;
  providers: WatchProvider[] = [];
  subscribedProviders: WatchProvider[] = [];
  providersSub: Subscription;
  formGroupData: { [provider_name: string]: boolean } = {};

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private watchProviderService: WatchProviderService) { }

  ngOnInit(): void {


    this.getProviders().subscribe((response: WatchProvider[]) => {
      response.forEach(provider => {
        this.providers.push(provider);
      })
    })

    this.providerForm = this.formBuilder.group(this.formGroupData);

    this.providersSub = this.watchProviderService.providersSubject.subscribe((response: WatchProvider[]) => {
      this.subscribedProviders = response;
      response.forEach((provider: WatchProvider) => {
        let checkbox = document.getElementById(provider.provider_id.toString()) as HTMLInputElement | null;
        checkbox.checked = true;
      })
    })

    this.watchProviderService.getUserProviders().subscribe(response => {
      if(response) {
        this.subscribedProviders = response;
        this.updateCheckbox();
      }
    })

    this.ref.detectChanges();
  }

  updateCheckbox() {
    this.providers.forEach(provider => {
      let checked = false;
      this.subscribedProviders.forEach(sub => {
        if (provider.provider_id == sub.provider_id) {
          checked = true;
        }
      })
      if (checked) {
        let checkbox = document.getElementById(provider.provider_id.toString()) as HTMLInputElement | null;
        checkbox.checked = true;
      }
    })
  }

  getProviders() {
    return this.watchProviderService.getAllProviders();
  }

  checkProviders() {
    this.providers.forEach(provider => {

    })
  }


  onCheckboxChange(e) {
    if (e.target.checked) {
      this.providers.forEach(provider => {
        if (provider.provider_id == e.target.id) {
          this.watchProviderService.addProvider(provider);
        }
      })
    } else {
      this.providers.forEach(provider => {
        if (provider.provider_id == e.target.id) {
          this.watchProviderService.removeProvider(provider.provider_id);
          for (let i = 0; i < this.subscribedProviders.length; i++) {
            if(this.subscribedProviders[i].provider_id == provider.provider_id) {
              this.subscribedProviders.splice(i, 1);
            }
          }
        }
      })
    }
  }

  ngOnDestroy() {
    this.providersSub.unsubscribe();
  }

}
