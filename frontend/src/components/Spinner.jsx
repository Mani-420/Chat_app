import { MessageSquare, Heart } from 'lucide-react';

const Spinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px] gap-6">
    {/* Animated chat bubbles */}
    <div className="relative">
      <div className="flex gap-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
        <div
          className="w-4 h-4 bg-secondary rounded-full animate-bounce"
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className="w-4 h-4 bg-accent rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
    </div>

    {/* Spinning ring */}
    <div className="relative">
      <div className="w-20 h-20 border-4 border-primary/10 border-t-primary border-r-secondary rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-base-100 rounded-full p-3 shadow-lg">
          <MessageSquare className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>
    </div>

    {/* Friendly message */}
    <div className="text-center space-y-2">
      <p className="text-lg font-semibold text-base-content flex items-center gap-2 justify-center">
        <Heart className="w-5 h-5 text-error animate-pulse" />
        Getting things ready
        <Heart className="w-5 h-5 text-error animate-pulse" />
      </p>
      <p className="text-sm text-base-content/60">
        Just a moment while we load your amazing conversations...
      </p>
    </div>
  </div>
);

export default Spinner;
