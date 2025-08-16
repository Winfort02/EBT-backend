export class DateProvider {
   private date = new Date;

   formatter(timezone: string) {
      return new Intl.DateTimeFormat('en-CA', 
         { 
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
         })
   }

   PHTNow() {
      return this.formatter('Asia/Singapore').format(this.date);
   }

   CATNow() {
      return this.formatter('America/Vancouver').format(this.date);
   }
}