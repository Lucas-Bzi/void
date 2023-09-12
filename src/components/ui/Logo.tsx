export default function Logo({ size = 16 }: { size?: number }) {
    return (
        <p 
            className="font-['Comfortaa'] pointer-events-none select-none" 
            style={{ fontSize: size }}
        >
            void
        </p>
    );
}