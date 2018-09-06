let taskBoard = (function () {
        let startSite = {

                init: function () {

                        this.cacheDomHeader();
                        this.cacheDomMain();
                        this.cacheDomFooter();
                        this.renderTemplates();


                },
                cacheDomHeader: function () {

                        this.header = document.getElementById('title');

                },
                cacheDomMain: function () {

                        this.main = document.getElementById('newTask');
                },
                cacheDomFooter: function () {

                        this.footer = document.getElementById('notes');
                },
                renderTemplates: function () {

                        this.header.innerHTML = boardTitleTemplate();
                        this.main.innerHTML = createTaskTemplate();
                        this.footer.innerHTML = '';
                        this.displayLocalStorage();
                        for (let i = 0; i < notes.notesArray.length; i++) {
                                if (notes.notesArray[i].justPosted === 'invisi') {
                                        this.footer.innerHTML += Mustache.to_html(displayNoteTemplate(), notes.notesArray[i]);
                                        setTimeout(() => {
                                                document.getElementById(notes.notesArray[i].title + 1).setAttribute('style', 'transition:0.4s ease-in; opacity:1;');
                                        }, 1);
                                        setTimeout(() => {
                                                notes.notesArray[i].justPosted = 'visi';
                                                this.saveLocalStorage();
                                        }, 400);
                                } else if (notes.notesArray[i].justPosted === 'visi') {
                                        this.footer.innerHTML += Mustache.to_html(displayNoteTemplate(), notes.notesArray[i]);
                                }
                        }


                },
                createNote: function () {
                        this.inputTitle = document.getElementById('titleTask').value;
                        this.inputTask = document.getElementById('textTask').value;
                        this.inputDate = document.getElementById('dateTask').value;
                        this.inputTime = document.getElementById('timeTask').value;
                        this.input = document.getElementsByClassName('inputValidation');
                        this.alert = document.getElementsByClassName('alertNotification');
                        this.dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\\.]\d{4}$/g;
                        this.timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g;
                        this.validateContent();
                },
                validateContent: function () {
                                //--------Start of all inputs are fill up--------//

                        for (let i = 0; i < this.input.length; i++) {
                                if (this.input[i].value === '') {
                                        this.alert[i].setAttribute('style', 'display:block');
                                        return this.alert[i].innerHTML = '* Please enter details';
                                } else {
                                        this.alert[i].innerHTML = '';
                                        this.alert[i].setAttribute('style', 'display:none');
                                }
                        }
                                //--------END Of all inputs are fill up--------//

                                //--------Start of Title is not taken--------//
                        for (let k = 0; k < notes.notesArray.length; k++) {
                                if (notes.notesArray[k].title === this.inputTitle) {
                                        this.alert[0].setAttribute('style', 'display:block');
                                        return this.alert[0].innerHTML = 'Title is already in use,</br> please chose another title';
                                } else {
                                        this.alert[0].setAttribute('style', 'display:none');
                                        this.alert[0].innerHTML = '';
                                }
                        }         
                                //--------END Of Title is not taken--------//
                                
                        //--------Start of date matches dateRegex and Current Year--------//
                                
                        if (!this.inputDate.match(this.dateRegex)) {
                                this.alert[2].setAttribute('style', 'display:block');
                                return this.alert[2].innerHTML = '* Invalid date please use dd/mm/yyyy';
                        } 
                        else {
                                this.alert[2].setAttribute('style', 'display:none');
                                this.alert[2].innerHTML = '';
                        }
                        //--------END Of date matches dateRegex and Current Year--------//

                                //--------Start of time matches timeRegex--------//
                                
                        if (!this.inputTime.match(this.timeRegex)) {
                                this.alert[3].setAttribute('style', 'display:block');
                                return this.alert[3].innerHTML = '* Invalid time please use 00:00';
                        } else {
                                this.alert[3].setAttribute('style', 'display:none');
                                this.alert[3].innerHTML = '';
                        }
                                //--------END Of time matches timeRegex--------//

                        this.newNote = new this.Note(this.inputTitle, this.inputTask, this.inputDate, this.inputTime);
                        this.saveLocalStorage();
                        this.renderTemplates();
                },
                saveLocalStorage: function () {

                        let temp = JSON.stringify(notes.notesArray);
                        localStorage.setItem(this.note, temp);

                },
                displayLocalStorage: function () {

                        this.note = 'note';
                        if (localStorage.getItem(this.note)) {
                                let temp = localStorage.getItem(this.note);
                                temp = JSON.parse(temp);
                                notes.notesArray = temp;
                        }
                },
                Note: function (title, text, date, time) {

                        this.title = title;
                        this.text = text;
                        this.date = date;
                        this.time = time;
                        this.justPosted = 'invisi';

                        return notes.notesArray.push({ title: this.title, text: this.text, date: this.date, time: this.time, justPosted: this.justPosted });

                },
                removeNote: function (id) {

                        for (var i = 0; i < notes.notesArray.length; i++) {
                                if (notes.notesArray[i].title === id) {
                                        notes.notesArray.splice(i, 1);
                                        document.getElementById(id + 1).setAttribute('style', 'transition:0.4s ease-out; opacity:0;');
                                        setTimeout(() => {
                                                this.saveLocalStorage();
                                                this.renderTemplates();
                                        }, 400);
                                }
                        }
                },
        }

        let notes = {

                notesArray: [{
                        title: "Example",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie tortor vitae gravida aliquam. Pellentesque ultrices sapien at felis hendrerit vestibulum. In hac habitasse platea dictumst. Suspendisse sit amet lorem id leo varius sodales. Ut sit amet massa ligula. Mauris sit amet tortor nec tellus tincidunt scelerisque. Aliquam eget mauris vel nunc cursus placerat.",
                        date: '04/09/2018',
                        time: '12:30',
                        justPosted: 'visi'
                },
                ],
        }
        startSite.init();
        return {
                startSite: startSite
        }


})();
