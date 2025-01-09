import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [FormsModule,CommonModule],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  selectedFile: File | null = null;
  showEditModal: boolean = false;
  formData: FormData = new FormData();
  isEditing = false;
  updatedUser: any = {};

  editing: boolean = false;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadProfile();
  }

  // Charger les informations utilisateur
  loadProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil :', err);
      }
    });
  }

  // Ouvrir le modal d'édition
  openEditModal(): void {
    this.showEditModal = true;
  }

  // Fermer le modal d'édition
  closeEditModal(): void {
    this.showEditModal = false;
  }

  // Sélection d'un fichier pour l'image de profil
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Mettre à jour le profil
  updateProfile(): void {
    const formData = new FormData();

    Object.keys(this.user).forEach((key) => {
      formData.append(key, this.user[key]);
    });

    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile);
    }

    this.userService.updateUserProfile(formData).subscribe({
      next: (data) => {
        this.user = data;
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du profil :', err);
      }
    });
  }


  onSaveChanges() {
    console.log('Saved changes:', this.user);
    // Envoyer les modifications au backend ici
  }
  
  onCancel() {
    console.log('Modification annulée');
    // Réinitialiser le formulaire ou rediriger l'utilisateur
  }
}