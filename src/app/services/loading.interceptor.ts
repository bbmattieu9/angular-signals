import {HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {LoadingService} from "@app/loading/loading.service";
import {inject} from "@angular/core";
import {finalize} from "rxjs";
import {SkipLoading} from "@app/loading/skip-loading.component";

export const loadingInterceptor: HttpInterceptorFn =
  (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  if (req.context.get(SkipLoading)) {
    return next(req);
  }

    const loadingSrv = inject(LoadingService);
    loadingSrv.loadingOn();
    return next(req)
      .pipe(
        finalize(() => {
          loadingSrv.loadingOff();
        })
      )

  }
